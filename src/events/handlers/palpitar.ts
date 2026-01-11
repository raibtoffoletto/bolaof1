import type { ModalSubmitInteraction } from 'discord.js';

export default async function handlePalpitar(interaction: ModalSubmitInteraction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    await interaction.editReply({
      content: 'Função de palpitar ainda não implementada. 🚧',
    });
  } catch (error: any) {
    return console.error(`[handlePalpitar]: ${error.message}`);
  }
}
