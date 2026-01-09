import type { Guild } from 'discord.js';
import registerCommands from '../lib/registerCommands';

export default async function onGuildCreate(guild: Guild) {
  try {
    console.log(`[onGuildCreate]: Joined server ${guild.name}`);

    if (!guild.members.me) {
      throw new Error('Bot member not found in guild');
    }

    await registerCommands(guild.id);
  } catch (error: any) {
    console.error(`[onGuildCreate]: ${error.message}`);
  }
}
