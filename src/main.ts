import 'dotenv/config';

import startBot from './bot';
import seedData from './data/seed';
import startMonitor from './monitor';
import startHttpServer from './server';

// Set up DB and seed initial data
seedData();

// Start Discord bot
const bot = startBot();

// Start monitoring service for recuring tasks
startMonitor(bot);

// Start HTTP server for admin operations
startHttpServer(bot);
