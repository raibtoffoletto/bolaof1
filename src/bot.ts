import { Client, GatewayIntentBits } from 'discord.js';
import onClientReady from './events/onClientReady';
import onGuildCreate from './events/onGuildCreate';
import onInteractionCreate from './events/onInteractionCreate';
import onMessageCreate from './events/onMessageCreate';

export default function startBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once('clientReady', onClientReady);

  client.on('guildCreate', onGuildCreate);

  client.on('interactionCreate', onInteractionCreate);

  client.on('messageCreate', onMessageCreate);

  client.login(process.env.DISCORD_BOT_TOKEN);

  return client;
}
