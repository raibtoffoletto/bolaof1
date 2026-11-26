import { type Guild } from 'discord.js';
import INSTANCES from '../data/repos/instances';
import registerCommands from '../lib/registerCommands';
import syncVotingWindows from '../lib/syncVotingWindows';
import verifyGuildData from '../lib/verifyGuildData';

export default async function onGuildCreate(guild: Guild) {
  try {
    console.log(`[onGuildCreate]: Joinning server <${guild.name}>`);

    if (!guild.members.me) {
      throw new Error('Bot member not found in guild');
    }

    await verifyGuildData(guild);
    await registerCommands(guild.id);

    const instance = INSTANCES.get(guild.id);
    if (!!instance) {
      await syncVotingWindows(guild.client, [instance]);
    }
  } catch (error: any) {
    console.error(`[onGuildCreate]: ${error.message}`);
  }
}
