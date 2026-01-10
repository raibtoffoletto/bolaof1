import { type ChatInputCommandInteraction } from 'discord.js';

export default async function handleClassificacao(
  interaction: ChatInputCommandInteraction,
) {
  try {
  } catch (error: any) {
    console.error(`[handleClassificacao]: ${error.message}`);
    await interaction.reply({
      content: '💣 I have the seat full of water!',
      ephemeral: true,
    });
  }
}
