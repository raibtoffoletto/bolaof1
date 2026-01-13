import { type ChatInputCommandInteraction } from 'discord.js';
import getQuote from '../../lib/getQuote';

export default async function handleAjuda(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  try {
    // TODO:  Implement help content
    await interaction.editReply({ content: getQuote() });
  } catch (error: any) {
    console.error(`[handleAjuda]: ${error.message}`);

    await interaction.editReply({ content: getQuote() });
  }
}
