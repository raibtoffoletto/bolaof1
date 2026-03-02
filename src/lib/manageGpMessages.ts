import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  type Client,
} from 'discord.js';
import GPs from '../data/repos/grandsprix';
import NOTIFICATIONS from '../data/repos/notifications';
import {
  CLASSIFICACAO_EVENT_ID,
  FLAGS,
  RACE_RESULT_EVENT_ID,
  START_VOTING_EVENT_ID,
} from './constants';
import getPodiumLabel from './getPodiumLabel';

export const isTooLate = (gpDate: number) => Date.now() > gpDate - 24 * 60 * 60 * 1000;

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
    : `### ⏱ Você tem 24h para registrar seu palpite!\n`;

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

export function getComponentsRow(grandprixId: string, locked = false) {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`${START_VOTING_EVENT_ID}${grandprixId}`)
      .setLabel(locked ? 'Ver Palpite' : 'Deixar Palpite')
      .setStyle(ButtonStyle.Primary),
  );

  if (locked) {
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

  const tooLate = isTooLate(gp.date);

  const message = await channel.send({
    content: getMessageContent(gp, tooLate),
    components: getComponentsRow(grandprixId, !!gp.polePosition),
  });

  NOTIFICATIONS.create(grandprixId, channelId, message.id, tooLate);
  console.log(`[monitor] Channel <${channelId}> notifyed for gp <${grandprixId}>.`);
}

export async function lock(client: Client, notification: GPNotification) {
  const { gp, channel } = await getValidEntities(
    client,
    notification.grandprixId,
    notification.channelId,
  );

  const message = await channel.messages.fetch(notification.messageId);
  if (!message) {
    throw new Error(
      `[monitor] Message <${notification.messageId}> not found in channel <${channel.id}>.`,
    );
  }

  await message.edit({
    content: getMessageContent(gp, true),
    components: getComponentsRow(notification.grandprixId, !!gp.polePosition),
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
