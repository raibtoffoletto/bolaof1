import { type Client } from 'discord.js';
import syncVotingWindows from './lib/syncVotingWindows';

const interval = Number(process.env.MONITOR_INTERVAL || 5) * 60 * 1000; // Every 5 minutes by default

export default function startMonitor(client: Client) {
  let intervalId: NodeJS.Timeout | undefined;
  let running = false;

  const tick = async () => {
    if (running) {
      return;
    }

    running = true;

    try {
      await syncVotingWindows(client);
    } catch (err: any) {
      console.error('[monitor] ' + err.message);
    } finally {
      running = false;
    }
  };

  // Discord calls only work once the client is ready, so the first run waits for it.
  client.once('clientReady', () => {
    intervalId = setInterval(tick, interval);
    tick();

    console.log(`[monitor] cron tasks monitor started (every ${interval / 60000} min)`);
  });

  return {
    stop: () => {
      clearInterval(intervalId);
    },
  };
}
