import { type ChatInputCommandInteraction } from 'discord.js';
import GPs from '../../data/grandsprix';
import { FLAGS } from '../../lib/constants';

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

    // TODO: implement results and user guesses
    // if (gp.date < Date.now()) {
    //   content += '\n\n ## Resultados\n';
    // }

    // if (gp.date < Date.now()) {
    //   content += '\n\n ## Meu Palpites\n';
    // }

    await interaction.reply({ content, ephemeral: true });
  } catch (error: any) {
    console.error(`[handleCorrida]: ${error.message}`);

    await interaction.reply({
      content: '🔍 Não achei a corrida que você pediu.',
      ephemeral: true,
    });
  }
}
