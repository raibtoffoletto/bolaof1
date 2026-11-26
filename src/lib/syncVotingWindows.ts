import { type Client, DiscordAPIError, RESTJSONErrorCodes } from 'discord.js';
import GPs from '../data/repos/grandsprix';
import INSTANCES from '../data/repos/instances';
import NOTIFICATIONS from '../data/repos/notifications';
import { REMINDER_HOURS } from './constants';
import { getVotingWindow, isTooLate, lock, notify, remind } from './manageGpMessages';
import verifyGuildData from './verifyGuildData';

// If the bot channel was deleted, recreate it and point the instance at the new one.
// Notifications are keyed by channel, so open windows get a fresh card there.
async function ensureBotChannel(client: Client, instance: Instance) {
  try {
    await client.channels.fetch(instance.channelId);

    return instance;
  } catch (error) {
    if (
      !(error instanceof DiscordAPIError) ||
      error.code !== RESTJSONErrorCodes.UnknownChannel
    ) {
      throw error;
    }
  }

  const guild = await client.guilds.fetch(instance.guildId);
  await verifyGuildData(guild);

  const updated = INSTANCES.get(instance.guildId);
  if (!updated) {
    throw new Error(`Instance for guild <${instance.guildId}> not found.`);
  }

  console.log(
    `[monitor] Channel <${instance.channelId}> was deleted, recreated as <${updated.channelId}> for guild <${instance.guildId}>.`,
  );

  return updated;
}

async function syncGpForInstance(client: Client, gp: GrandPrix, instance: Instance) {
  const notification = NOTIFICATIONS.get(gp.id, instance.channelId);
  const tooLate = isTooLate(gp.id, gp.date);

  if (!notification) {
    // A window that closed before the card was ever posted is skipped on purpose.
    if (!tooLate) {
      await notify(client, gp.id, instance.channelId);
    }

    return;
  }

  if (notification.locked) {
    return;
  }

  if (tooLate) {
    await lock(client, notification);

    return;
  }

  const { closesAt } = getVotingWindow(gp.id, gp.date);
  if (
    !notification.reminded &&
    Date.now() >= closesAt - REMINDER_HOURS * 60 * 60 * 1000
  ) {
    await remind(client, notification);
  }
}

export default async function syncVotingWindows(
  client: Client,
  instances: Instance[] = INSTANCES.list(),
) {
  const gps = GPs.find(Date.now());
  if (!gps.length) {
    return;
  }

  for (const _instance of instances) {
    let instance: Instance;

    try {
      instance = await ensureBotChannel(client, _instance);
    } catch (error: any) {
      console.error(
        `[monitor] Failed to verify channel of guild <${_instance.guildId}>: ${error.message}`,
      );

      continue;
    }

    for (const gp of gps) {
      try {
        await syncGpForInstance(client, gp, instance);
      } catch (error: any) {
        console.error(
          `[monitor] Failed to sync gp <${gp.id}> on channel <${instance.channelId}>: ${error.message}`,
        );
      }
    }
  }
}
