import type { Interaction } from 'discord.js';
import { BOT_EVENT_PREFIX, SUBMIT_VOTE_EVENT_ID } from '../lib/constants';
import handleButton from './handleButton';
import handleChatInput from './handleChatInput';
import handlePalpitar from './handlers/palpitar';

export default function onInteractionCreate(interaction: Interaction) {
  if (interaction.isButton() && interaction.customId.startsWith(BOT_EVENT_PREFIX)) {
    return handleButton(interaction);
  }

  if (
    interaction.isModalSubmit() &&
    interaction.customId.startsWith(SUBMIT_VOTE_EVENT_ID)
  ) {
    return handlePalpitar(interaction);
  }

  if (interaction.isChatInputCommand()) {
    return handleChatInput(interaction);
  }
}
