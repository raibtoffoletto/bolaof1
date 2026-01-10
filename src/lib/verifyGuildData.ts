import { ChannelType, type Guild } from 'discord.js';
import INSTANCES from '../data/repos/instances';
import { BOT_CHANNEL_NAME } from '../lib/constants';

async function getOrCreateBotChannel(guild: Guild) {
  const channel = guild.channels.cache.find((x) => x.name === BOT_CHANNEL_NAME);

  if (!!channel) {
    return channel.id;
  }

  const newChannel = await guild.channels.create({
    name: BOT_CHANNEL_NAME,
    type: ChannelType.GuildText,
  });

  return newChannel.id;
}

export default async function verifyGuildData(guild: Guild) {
  const instance = INSTANCES.get(guild.id);

  if (!!instance) {
    const channelId = await getOrCreateBotChannel(guild);

    if (instance.channelId === channelId) {
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
