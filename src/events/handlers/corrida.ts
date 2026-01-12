import { type ChatInputCommandInteraction } from 'discord.js';
import DRIVERS from '../../data/repos/drivers';
import GPs from '../../data/repos/grandsprix';
import PREDICTIONS from '../../data/repos/predictions';
import USERS from '../../data/repos/users';
import { FLAGS, P1, P2, P3, POLE } from '../../lib/constants';
import getQuote from '../../lib/getQuote';

function getPredictionLabel(pole: number, p1: number, p2: number, p3: number) {
  const drivers = DRIVERS.list();
  const dPole = drivers.find((x) => x.id === pole);
  const dP1 = drivers.find((x) => x.id === p1);
  const dP2 = drivers.find((x) => x.id === p2);
  const dP3 = drivers.find((x) => x.id === p3);

  let content = `${POLE}: ${dPole?.name} <${dPole?.id}>\n`;
  content += `${P1}: ${dP1?.name} <${dP1?.id}>\n`;
  content += `${P2}: ${dP2?.name} <${dP2?.id}>\n`;
  content += `${P3}: ${dP3?.name} <${dP3?.id}>\n`;

  return content;
}

export default async function handleCorrida(interaction: ChatInputCommandInteraction) {
  try {
    const gpId = interaction.options.getString('corrida') ?? '';
    const gp = GPs.get(gpId);

    if (!gp) {
      throw new Error(`Grand Prix <${gpId}> not found.`);
    }

    let content = `# ${FLAGS[gp.country]} ${gp.name}\n`;
    content += `* 🎪\t**Circuito**: ${gp.circuit}\n`;
    content += `* ⏰\t**Data**: <t:${gp.date / 1000}:F>\n`;

    const isInPast = gp.date < Date.now();

    // TODO: implement results
    // if (isInPast) {
    //   content += '\n\n ## Resultados\n';
    // }

    const guildId = interaction.guildId ?? '';
    const user = USERS.get(interaction.user.id, guildId);
    if (!!user) {
      const prediction = PREDICTIONS.get(gpId, user.id, guildId);

      content += '\n## Meu Palpites\n\n';

      if (prediction) {
        content += getPredictionLabel(
          prediction.polePosition,
          prediction.firstPlace,
          prediction.secondPlace,
          prediction.thirdPlace,
        );
      } else {
        content += `> Você ${isInPast ? '' : 'ainda'} não deu o seu palpite para esta corrida!`;
      }
    }

    await interaction.reply({ content, ephemeral: true });
  } catch (error: any) {
    console.error(`[handleCorrida]: ${error.message}`);

    await interaction.reply({
      content: getQuote(),
      ephemeral: true,
    });
  }
}
