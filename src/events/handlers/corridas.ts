import { type ChatInputCommandInteraction } from 'discord.js';
import GPs from '../../data/grandsprix';
import paginate from '../../lib/paginate';
import spacer from '../../lib/spacer';

export default async function handleCorridas(interaction: ChatInputCommandInteraction) {
  try {
    const gps = GPs.list();
    const nameLength = Math.max(...gps.map((d) => d.name.length));
    const circuitLength = Math.max(...gps.map((d) => d.circuit.length));

    let header = `  Id   │  País  │ ${spacer(nameLength, { text: 'Corrida' })} │ ${spacer(circuitLength, { text: 'Circuito' })}\n`;
    header += `────── │ ────── │ ${spacer(nameLength, { solid: true })} │ ${spacer(circuitLength, { solid: true })}\n`;

    let i = 0;
    for (const _gps of paginate(gps, 15)) {
      let content = `Calendário 2026\`\`\``;
      content += header;

      for (const gp of _gps) {
        content += ' ' + gp.id.padEnd(3, ' ') + '   │ ';
        content += ' ' + gp.country + '   │ ';
        content += gp.name.padEnd(nameLength, ' ') + ' │ ';
        content += gp.circuit.padEnd(circuitLength, ' ') + '\n';
      }

      content += `\`\`\``;

      if (i === 0) {
        await interaction.reply({ content: content, ephemeral: true });

        i++;
        continue;
      }

      await interaction.followUp({ content: content, ephemeral: true });
    }
  } catch (error: any) {
    console.error(`[handleCorridas]: ${error.message}`);

    await interaction.reply({
      content: '❌ Ocorreu um erro ao listar as corridas.',
      ephemeral: true,
    });
  }
}
