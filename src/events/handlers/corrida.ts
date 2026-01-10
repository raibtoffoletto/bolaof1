import { type ChatInputCommandInteraction } from 'discord.js';
import GPs from '../../data/repos/grandsprix';
import USERS from '../../data/repos/users';
import { FLAGS } from '../../lib/constants';
import getQuote from '../../lib/getQuote';

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
    // TODO: implement results and user guesses
    // if (isInPast) {
    //   content += '\n\n ## Resultados\n';
    // }

    const user = USERS.get(interaction.user.id, interaction.guildId ?? '');
    if (!!user) {
      content += '\n## Meu Palpites\n';

      content += `> Você ${isInPast ? '' : 'ainda'} não deu o seu palpite para esta corrida!\n`;
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
