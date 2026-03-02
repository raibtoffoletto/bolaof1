import { type ButtonInteraction } from 'discord.js';
import { RACE_RESULT_EVENT_ID } from '../../lib/constants';
import getQuote from '../../lib/getQuote';
import notifyRanks from '../../lib/notifyRanks';

export default async function handleRaceResult(interaction: ButtonInteraction) {
  await interaction.deferReply({ ephemeral: true });

  try {
    const grandprixId = interaction.customId.replace(RACE_RESULT_EVENT_ID, '');

    await notifyRanks(
      interaction.guild?.id ?? '',
      async (content) => {
        await interaction.editReply({ content });
      },
      async (content) => {
        await interaction.followUp({ content, ephemeral: true });
      },
      grandprixId,
    );
  } catch (error: any) {
    console.error(`[handleRaceResult]: ${error.message}`);
    console.error(error);

    await interaction.editReply({ content: getQuote() });
  }
}
