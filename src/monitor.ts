import { type Client } from 'discord.js';
import GPs from './data/repos/grandsprix';
import INSTANCES from './data/repos/instances';
import NOTIFICATIONS from './data/repos/notifications';
import { isTooLate, lock, notify } from './lib/manageGpMessages';

const interval = Number(process.env.MONITOR_INTERVAL ?? 1) * 60 * 60 * 1000; //  Every hour by default

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
