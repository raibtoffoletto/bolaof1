import type { Client } from 'discord.js';
import registerCommands from '../lib/registerCommands';

export default async function onClientReady(client: Client) {
  try {
    console.log(`[onClientReady]: <${client.user?.tag}> is online 🎉`);

    console.log(`[onClientReady]: Updating slash commands for all guilds...`);

    const guilds = client.guilds.cache;

    for (const [_, guild] of guilds) {
      await registerCommands(guild.id);
    }

    console.log(`[onClientReady]: ... Done!`);
  } catch (error: any) {
    console.error(`[onClientReady]: ${error.message}`);
  }
}
