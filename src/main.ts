import 'dotenv/config';

import { Client, GatewayIntentBits } from 'discord.js';
import seedData from './data/seed';
import onClientReady from './events/onClientReady';
import onGuildCreate from './events/onGuildCreate';
import onInteractionCreate from './events/onInteractionCreate';

seedData();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('clientReady', onClientReady);

client.on('guildCreate', onGuildCreate);

client.on('interactionCreate', onInteractionCreate);

client.login(process.env.DISCORD_BOT_TOKEN);
