import type { Client } from 'discord.js';
import polka from 'polka';

export default function startHttpServer(client: Client) {
  const app = polka();

  app.listen(3000, (err: Error) => {
    if (err) {
      console.error('[httpServer] failed to start:', err.message);

      return process.exit(1);
    }

    console.log('[httpServer] listening on http://localhost:3000');
  });

  return {
    stop: () => {
      app.server?.close();
    },
  };
}
