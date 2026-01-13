import { type ChatInputCommandInteraction } from 'discord.js';
import GPs from '../../data/repos/grandsprix';
import PREDICTIONS from '../../data/repos/predictions';
import USERS from '../../data/repos/users';
import { FLAGS } from '../../lib/constants';
import getPodiumLabel from '../../lib/getPodiumLabel';
import getQuote from '../../lib/getQuote';

export default async function handleCorrida(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  try {
    const gpId = interaction.options.getString('corrida') ?? '';
    const gp = GPs.get(gpId);

    if (!gp) {
      throw new Error(`Grand Prix <${gpId}> not found.`);
    }

    let content = `# ${FLAGS[gp.country]} ${gp.name}\n`;
    content += `* 🎪\t**Circuito**: ${gp.circuit}\n`;
    content += `* ⏰\t**Data**: <t:${gp.date / 1000}:F>\n`;

    if (!!gp.polePosition && !!gp.firstPlace && !!gp.secondPlace && !!gp.thirdPlace) {
      content += '\n## Resultados\n\n';
      content += getPodiumLabel(
        gp.polePosition,
        gp.firstPlace,
        gp.secondPlace,
        gp.thirdPlace,
      );
    }

    const isInPast = gp.date < Date.now();
    const guildId = interaction.guildId ?? '';
    const user = USERS.get(interaction.user.id, guildId);

    if (!!user) {
      const prediction = PREDICTIONS.get(gpId, user.id, guildId);

      content += '\n## Meu Palpites\n\n';

      if (prediction) {
        content += getPodiumLabel(
          prediction.polePosition,
          prediction.firstPlace,
          prediction.secondPlace,
          prediction.thirdPlace,
        );

        if (isInPast) {
          content += `> Pontos ganhos: **${prediction.points}**`;
        }
      } else {
        content += `> Você ${isInPast ? '' : 'ainda'} não deu o seu palpite para esta corrida!`;
      }
    }

    await interaction.editReply({ content });
  } catch (error: any) {
    console.error(`[handleCorrida]: ${error.message}`);

    await interaction.editReply({ content: getQuote() });
  }
}
