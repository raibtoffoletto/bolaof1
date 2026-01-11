import type { Interaction } from 'discord.js';
import { COMMANDS } from '../lib/constants';
import handleAjuda from './handlers/ajuda';
import handleClassificacao from './handlers/classificacao';
import handleCorrida from './handlers/corrida';
import handleCorridas from './handlers/corridas';
import handlePilotos from './handlers/pilotos';

export default function onInteractionCreate(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case COMMANDS.AJUDA:
      return handleAjuda(interaction);

    case COMMANDS.CLASSIFICACAO:
      return handleClassificacao(interaction);

    case COMMANDS.CORRIDA:
      return handleCorrida(interaction);

    case COMMANDS.CORRIDAS:
      return handleCorridas(interaction);

    case COMMANDS.PILOTOS:
      return handlePilotos(interaction);

    default:
      return interaction.reply({
        content: '🤔 hum... não estou achando esse comando!',
        ephemeral: true,
      });
  }
}
