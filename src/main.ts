import 'dotenv/config';

import startBot from './bot';
import seedData from './data/seed';
// import startMonitor from './monitor';
import startHttpServer from './server';

// Set up DB and seed initial data
seedData();

// Start Discord bot
const bot = startBot();

// Start monitoring service for recuring tasks
// const monitor = startMonitor(bot);

// Start HTTP server for admin operations
const server = startHttpServer(bot);

// Graceful shutdown
async function shutdown() {
  console.log('Shutting down gracefully...');
  // monitor.stop();
  server.stop();

  await bot.destroy();

  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
