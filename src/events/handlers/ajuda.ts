import { type ChatInputCommandInteraction } from 'discord.js';
import { HELP_TEXT } from '../../lib/constants';
import getQuote from '../../lib/getQuote';

export default async function handleAjuda(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  try {
    await interaction.editReply({ content: HELP_TEXT });
  } catch (error: any) {
    console.error(`[handleAjuda]: ${error.message}`);

    await interaction.editReply({ content: getQuote() });
  }
}
