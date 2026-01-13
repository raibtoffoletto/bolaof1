import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  type Client,
} from 'discord.js';
import GPs from './data/repos/grandsprix';
import INSTANCES from './data/repos/instances';
import NOTIFICATIONS from './data/repos/notifications';
import { FLAGS, VOTE_EVENT_ID } from './lib/constants';

const interval = Number(process.env.MONITOR_INTERVAL ?? 1) * 60 * 60 * 1000; //  Every hour by default

const isTooLate = (gpDate: number) => Date.now() > gpDate - 24 * 60 * 60 * 1000;

function getMessageContent(gp: GrandPrix, lock = false) {
  let content = `# ${FLAGS[gp.country]} ${gp.name}\n\n\n`;
  content += `É final de semana de corrida 🎉\n\n`;
  content += lock
    ? `Votação encerrada 🚫\n\nBoa sorte à todos 🏁`
    : `⏱ Você tem 24h participar do bolão!\n`;

  return content;
}

async function getValidEntities(client: Client, grandprixId: string, channelId: string) {
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

async function notify(client: Client, grandprixId: string, channelId: string) {
  const { gp, channel } = await getValidEntities(client, grandprixId, channelId);

  const tooLate = isTooLate(gp.date);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`${VOTE_EVENT_ID}${grandprixId}`)
      .setLabel('🏁 Deixe o seu palpite 🏁')
      .setStyle(ButtonStyle.Primary),
  );

  const message = await channel.send({
    content: getMessageContent(gp, tooLate),
    components: tooLate ? [] : [row],
  });

  NOTIFICATIONS.create(grandprixId, channelId, message.id, tooLate);
  console.log(`[monitor] Channel <${channelId}> notifyed for gp <${grandprixId}>.`);
}

async function lock(client: Client, notification: GPNotification) {
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
    components: [],
  });

  NOTIFICATIONS.lock(notification.grandprixId, notification.channelId);
  console.log(
    `[monitor] Message <${notification.messageId}> locked for gp <${notification.grandprixId}> on channel <${notification.channelId}>.`,
  );
}

function gpMonitor(client: Client) {
  return async () => {
    try {
      const gps = GPs.find(Date.now());
      if (!gps.length) {
        return;
      }

      const instances = INSTANCES.list();
      if (!instances.length) {
        return;
      }

      for (const gp of gps) {
        for (const instance of instances) {
          const notification = NOTIFICATIONS.get(gp.id, instance.channelId);
          if (!notification) {
            await notify(client, gp.id, instance.channelId);

            continue;
          }

          if (!notification.locked && isTooLate(gp.date)) {
            await lock(client, notification);
          }
        }
      }
    } catch (err: any) {
      console.error('[monitor] ' + err.message);
    }
  };
}

export default function startMonitor(client: Client) {
  const intervalId = setInterval(gpMonitor(client), interval);

  console.log('[monitor] cron tasks monitor started');

  return {
    stop: () => {
      clearInterval(intervalId);
    },
  };
}
