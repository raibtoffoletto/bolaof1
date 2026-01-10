import { type ChatInputCommandInteraction } from 'discord.js';

export default async function handleAjuda(interaction: ChatInputCommandInteraction) {
  try {
  } catch (error: any) {
    console.error(`[handleAjuda]: ${error.message}`);
    await interaction.reply({
      content: '💣 All the time, you have to leave a space!',
      ephemeral: true,
    });
  }
}
