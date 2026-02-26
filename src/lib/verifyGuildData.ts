import { type Guild } from 'discord.js';
import INSTANCES from '../data/repos/instances';
import getOrCreateBotChannel from './getOrCreateBotChannel';

export default async function verifyGuildData(guild: Guild) {
  const instance = INSTANCES.get(guild.id);

  if (!!instance) {
    const channelId = await getOrCreateBotChannel(guild);

    if (instance.channelId !== channelId) {
      INSTANCES.update({ ...instance, channelId });
    }

    return;
  }

  INSTANCES.create({
    guildId: guild.id,
    name: guild.name,
    channelId: await getOrCreateBotChannel(guild),
  });

  console.log(`[verifyGuildData]: Database entry updated for guild <${guild.name}>.`);
}
