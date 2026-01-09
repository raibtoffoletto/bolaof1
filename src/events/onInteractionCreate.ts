import type { Interaction } from 'discord.js';
import { COMMANDS } from '../lib/constants';
import handleCorrida from './handlers/corrida';
import handleCorridas from './handlers/corridas';
import handlePilotos from './handlers/pilotos';

export default async function onInteractionCreate(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case COMMANDS.CORRIDA:
      await handleCorrida(interaction);

      break;

    case COMMANDS.CORRIDAS:
      await handleCorridas(interaction);

      break;

    case COMMANDS.PILOTOS:
      await handlePilotos(interaction);

      break;

    default:
      await interaction.reply({
        content: '🤔 hum... não tou achando esse comando!',
        ephemeral: true,
      });

      break;
  }
}

// interaction.user.id
// interaction.user.username
// interaction.user.avatar
// interaction.guildId
