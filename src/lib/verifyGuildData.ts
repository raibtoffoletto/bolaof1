import { ChannelType, PermissionsBitField, type Guild } from 'discord.js';
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
    topic: 'Notificações sobre as corridas e votação acontecerão aqui.',
    permissionOverwrites: [
      {
        id: guild.roles.everyone.id,
        deny: [
          PermissionsBitField.Flags.SendMessages,
          PermissionsBitField.Flags.AddReactions,
          PermissionsBitField.Flags.SendMessagesInThreads,
        ],
      },
      {
        id: guild.members.me!.id,
        allow: [
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.SendMessages,
        ],
      },
    ],
  });

  await newChannel.send(
    `# 🎉 Bem-vindos ao Bolão da F1 2026 🎉\n` +
      `- Por aqui você poderá palpitar corrida a corrida e ganhar pontos para o bolão.\n` +
      `- Fique atento às mensagens para não perder nenhuma novidade! 🚀\n\n` +
      `> Para começar, utilize o comando \`/ajuda\` para ver todas as funcionalidades disponíveis e regras.`,
  );

  return newChannel.id;
}

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
