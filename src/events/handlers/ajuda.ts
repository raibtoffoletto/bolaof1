import { type ChatInputCommandInteraction } from 'discord.js';
import getQuote from '../../lib/getQuote';

export default async function handleAjuda(interaction: ChatInputCommandInteraction) {
  try {
    // TODO:  Implement help content
    await interaction.reply({
      content: getQuote(),
      ephemeral: true,
    });
  } catch (error: any) {
    console.error(`[handleAjuda]: ${error.message}`);
    await interaction.reply({
      content: getQuote(),
      ephemeral: true,
    });
  }
}
