import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  type Guild,
} from 'discord.js';
import {
  BOT_CHANNEL_NAME,
  BOT_EVENT_PREFIX,
  COMMANDS,
  HELP_TEXT,
} from '../lib/constants';

const welcomeMessageActions = [
  [`${BOT_EVENT_PREFIX}${COMMANDS.CORRIDAS}`, '🏁 Lista de Corridas'],
  [`${BOT_EVENT_PREFIX}${COMMANDS.PILOTOS}`, '🏎️ Lista de Pilotos'],
  [`${BOT_EVENT_PREFIX}${COMMANDS.CLASSIFICACAO}`, '📜 Classificação Geral'],
];

export default async function getOrCreateBotChannel(guild: Guild) {
  const channel = guild.channels.cache.find((x) => x.name === BOT_CHANNEL_NAME);

  if (!!channel) {
    return channel.id;
  }

  const newChannel = await guild.channels.create({
    name: BOT_CHANNEL_NAME,
    type: ChannelType.GuildText,
    topic: 'Canal do BolãoF1: notificações, votação e classificação acontecem aqui.',
  });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    ...welcomeMessageActions.map(([customId, label]) =>
      new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(ButtonStyle.Primary),
    ),
  );

  const message = await newChannel.send({
    content:
      HELP_TEXT +
      '\n\n### Clique nos botões abaixo para acessar as principais funcionalidades do bolão:',
    components: [row],
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await message.pin();

  return newChannel.id;
}
