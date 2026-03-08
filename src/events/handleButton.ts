import type { ButtonInteraction } from 'discord.js';
import {
  CLASSIFICACAO_EVENT_ID,
  CORRIDAS_EVENT_ID,
  PILOTOS_EVENT_ID,
  RACE_RESULT_EVENT_ID,
  START_VOTING_EVENT_ID,
} from '../lib/constants';
import handleClassificacao from './handlers/classificacao';
import handleCorridas from './handlers/corridas';
import handlePilotos from './handlers/pilotos';
import handleRaceResult from './handlers/raceResult';
import handleVotacao from './handlers/votacao';

export default function handleButton(interaction: ButtonInteraction) {
  try {
    switch (true) {
      case interaction.customId.startsWith(START_VOTING_EVENT_ID):
        return handleVotacao(interaction);

      case interaction.customId === CLASSIFICACAO_EVENT_ID:
        return handleClassificacao(interaction);

      case interaction.customId.startsWith(RACE_RESULT_EVENT_ID):
        return handleRaceResult(interaction);

      case interaction.customId === CORRIDAS_EVENT_ID:
        return handleCorridas(interaction);

      case interaction.customId === PILOTOS_EVENT_ID:
        return handlePilotos(interaction);
    }
  } catch (error) {
    console.error('Error handling button interaction:', error);
  }
}
