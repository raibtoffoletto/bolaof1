import { type ChatInputCommandInteraction } from 'discord.js';
import getQuote from '../../lib/getQuote';

export default async function handleAjuda(interaction: ChatInputCommandInteraction) {
  try {
  } catch (error: any) {
    console.error(`[handleAjuda]: ${error.message}`);
    await interaction.reply({
      content: getQuote(),
      ephemeral: true,
    });
  }
}
