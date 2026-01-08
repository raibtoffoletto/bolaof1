import 'dotenv/config';

import { Client, GatewayIntentBits } from 'discord.js';
import onClientReady from './events/onClientReady';
import onGuildCreate from './events/onGuildCreate';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('clientReady', onClientReady);

client.on('guildCreate', onGuildCreate);

client.login(process.env.DISCORD_BOT_TOKEN);
