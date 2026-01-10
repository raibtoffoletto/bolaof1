import { type ChatInputCommandInteraction } from 'discord.js';
import getQuote from '../../lib/getQuote';

export default async function handleClassificacao(
  interaction: ChatInputCommandInteraction,
) {
  try {
  } catch (error: any) {
    console.error(`[handleClassificacao]: ${error.message}`);
    await interaction.reply({
      content: getQuote(),
      ephemeral: true,
    });
  }
}
