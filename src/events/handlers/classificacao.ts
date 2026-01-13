import { type ChatInputCommandInteraction } from 'discord.js';
import getQuote from '../../lib/getQuote';
import notifyRanks from '../../lib/notifyRanks';

export default async function handleClassificacao(
  interaction: ChatInputCommandInteraction,
) {
  await interaction.deferReply({ ephemeral: true });

  try {
    await notifyRanks(
      interaction.guild?.id ?? '',
      async (content) => {
        await interaction.editReply({ content });
      },
      async (content) => {
        await interaction.followUp({ content, ephemeral: true });
      },
    );
  } catch (error: any) {
    console.error(`[handleClassificacao]: ${error.message}`);

    await interaction.editReply({ content: getQuote() });
  }
}
