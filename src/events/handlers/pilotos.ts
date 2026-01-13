import type { ChatInputCommandInteraction } from 'discord.js';
import DRIVERS from '../../data/repos/drivers';
import getQuote from '../../lib/getQuote';
import spacer from '../../lib/spacer';

export default async function handlePilotos(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  try {
    const drivers = DRIVERS.list();

    const nameLength = Math.max(...drivers.map((d) => d.name.length));

    let content = `\`\`\``;
    content += `  N°   │ ${spacer(nameLength, { text: 'Piloto' })} │ Equipe\n`;
    content += `────── │ ${spacer(nameLength, { solid: true })} │ ────────────\n`;

    for (const driver of drivers) {
      content += '  ' + driver.id.toString().padStart(2, ' ') + '   │ ';
      content += driver.name.padEnd(nameLength, ' ') + ' │ ';
      content += driver.team + '\n';
    }

    content += `\`\`\``;

    await interaction.editReply({ content });
  } catch (error: any) {
    console.error(`[handlePilotos]: ${error.message}`);

    await interaction.editReply({ content: getQuote() });
  }
}
