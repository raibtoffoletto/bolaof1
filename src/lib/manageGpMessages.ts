import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  type Client,
  DiscordAPIError,
  RESTJSONErrorCodes,
} from 'discord.js';
import GPs from '../data/repos/grandsprix';
import NOTIFICATIONS from '../data/repos/notifications';
import {
  CLASSIFICACAO_EVENT_ID,
  FLAGS,
  RACE_RESULT_EVENT_ID,
  START_VOTING_EVENT_ID,
  VOTING_CLOSES_HOURS,
  VOTING_OPENS_HOURS,
} from './constants';
import getPodiumLabel from './getPodiumLabel';

const HOUR = 60 * 60 * 1000;

export const isSprint = (gpId: string) => gpId.includes('S');

export function getVotingWindow(gpId: string, gpDate: number) {
  const closesHours = isSprint(gpId)
    ? VOTING_CLOSES_HOURS.SPRINT
    : VOTING_CLOSES_HOURS.GP;

  return {
    opensAt: gpDate - VOTING_OPENS_HOURS * HOUR,
    closesAt: gpDate - closesHours * HOUR,
  };
}

export const isTooLate = (gpId: string, gpDate: number) =>
  Date.now() > getVotingWindow(gpId, gpDate).closesAt;

const toDiscordTime = (ms: number) => Math.floor(ms / 1000);

const getMessageUrl = (guildId: string, channelId: string, messageId: string) =>
  `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;

export function getMessageContent(gp: GrandPrix, locked = false) {
  let content = `# ${FLAGS[gp.country]} ${gp.name}\n\n`;

  if (!locked) {
    content += `🎉 É final de semana de corrida 🎉\n\n`;
  }

  content += `* 🎪\t**Circuito**: ${gp.circuit}\n`;
  content += `* ⏰\t**Data**: <t:${gp.date / 1000}:F>\n\n`;

  content += locked
    ? !!gp.polePosition
      ? '## Fim de Corrida 🎉\n'
      : `### Votação encerrada 🚫\n\nBoa sorte à todos 🏁`
    : `### ⏱ Votação encerra <t:${toDiscordTime(getVotingWindow(gp.id, gp.date).closesAt)}:R>!\n`;

  if (
    !!locked &&
    !!gp.polePosition &&
    !!gp.firstPlace &&
    !!gp.secondPlace &&
    !!gp.thirdPlace
  ) {
    content += '### Resultados\n\n';
    content += getPodiumLabel(
      gp.polePosition,
      gp.firstPlace,
      gp.secondPlace,
      gp.thirdPlace,
    );
    content += '\n\n';
  }

  return content;
}

export async function getValidEntities(
  client: Client,
  grandprixId: string,
  channelId: string,
) {
  const gp = GPs.get(grandprixId);

  if (!gp) {
    throw new Error(`[monitor] Grand Prix <${grandprixId}> not found.`);
  }

  const channel = await client.channels.fetch(channelId);

  if (!channel || channel.type !== ChannelType.GuildText) {
    throw new Error(`[monitor] Channel <${channelId}> not found or is not text based`);
  }

  return { gp, channel };
}

export function getComponentsRow(grandprixId: string, locked = false, resultsIn = false) {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`${START_VOTING_EVENT_ID}${grandprixId}`)
      .setLabel(locked ? 'Ver Palpite' : 'Deixar Palpite')
      .setStyle(ButtonStyle.Primary),
  );

  if (locked && resultsIn) {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId(`${RACE_RESULT_EVENT_ID}${grandprixId}`)
        .setLabel('Pontuação da Corrida')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId(CLASSIFICACAO_EVENT_ID)
        .setLabel('Classificação Geral')
        .setStyle(ButtonStyle.Primary),
    );
  }

  return [row];
}

export async function notify(client: Client, grandprixId: string, channelId: string) {
  const { gp, channel } = await getValidEntities(client, grandprixId, channelId);

  const message = await channel.send({
    content: getMessageContent(gp),
    components: getComponentsRow(grandprixId),
  });

  NOTIFICATIONS.create(grandprixId, channelId, message.id);
  console.log(`[monitor] Channel <${channelId}> notifyed for gp <${grandprixId}>.`);
}

export async function remind(client: Client, notification: GPNotification) {
  const { gp, channel } = await getValidEntities(
    client,
    notification.grandprixId,
    notification.channelId,
  );

  const { closesAt } = getVotingWindow(gp.id, gp.date);
  const url = getMessageUrl(channel.guildId, channel.id, notification.messageId);

  await channel.send({
    content: `⏰ Últimas horas para palpitar no ${gp.name}! Votação encerra <t:${toDiscordTime(closesAt)}:R>: ${url}`,
  });

  NOTIFICATIONS.setReminded(notification.grandprixId, notification.channelId);
  console.log(
    `[monitor] Channel <${notification.channelId}> reminded for gp <${notification.grandprixId}>.`,
  );
}

async function fetchMessage(
  channel: Awaited<ReturnType<typeof getValidEntities>>['channel'],
  messageId: string,
) {
  try {
    return await channel.messages.fetch(messageId);
  } catch (error) {
    if (
      error instanceof DiscordAPIError &&
      error.code === RESTJSONErrorCodes.UnknownMessage
    ) {
      return null;
    }

    throw error;
  }
}

export async function lock(client: Client, notification: GPNotification) {
  const { gp, channel } = await getValidEntities(
    client,
    notification.grandprixId,
    notification.channelId,
  );

  const message = await fetchMessage(channel, notification.messageId);
  if (!message) {
    // The card was deleted: mark it locked so the monitor stops retrying every tick.
    NOTIFICATIONS.lock(notification.grandprixId, notification.channelId);
    console.error(
      `[monitor] Message <${notification.messageId}> not found in channel <${channel.id}>, marked as locked.`,
    );

    return;
  }

  await message.edit({
    content: getMessageContent(gp, true),
    components: getComponentsRow(notification.grandprixId, true, !!gp.polePosition),
  });

  channel.send({
    content: !!gp.polePosition
      ? `Fim de corrida. Veja os resultados: ${message.url}`
      : `Apostas encerradas para a corrida: ${message.url}`,
  });

  NOTIFICATIONS.lock(notification.grandprixId, notification.channelId);
  console.log(
    `[monitor] Message <${notification.messageId}> locked for gp <${notification.grandprixId}> on channel <${notification.channelId}>.`,
  );
}
