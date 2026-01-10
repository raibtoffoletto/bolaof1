import { type Client } from 'discord.js';
import INSTANCES from '../data/repos/instances';
import registerCommands from '../lib/registerCommands';
import verifyGuildData from '../lib/verifyGuildData';

function findOrphanedInstances(guildIds: string[]) {
  const instances = INSTANCES.list().map((i) => i.guildId);

  const orphanedInstances = instances.filter((id) => !guildIds.includes(id));

  if (!!orphanedInstances.length) {
    orphanedInstances.forEach((id) => INSTANCES.remove(id));

    console.log(
      `[onClientReady]: Found and cleared ${orphanedInstances.length} orphaned instances.`,
    );
  }
}

export default async function onClientReady(client: Client) {
  try {
    console.log(`[onClientReady]: <${client.user?.tag}> is online 🎉`);

    console.log(
      `[onClientReady]: Updating slash commands for all guilds and veryfying data integrity.`,
    );

    const guilds = client.guilds.cache;

    for (const [_, guild] of guilds) {
      await verifyGuildData(guild);
      await registerCommands(guild.id);
    }

    findOrphanedInstances(guilds.map((g) => g.id));

    console.log(`[onClientReady]: ... Done!`);
  } catch (error: any) {
    console.error(`[onClientReady]: ${error.message}`);
  }
}
