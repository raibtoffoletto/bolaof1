import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  type ButtonInteraction,
} from 'discord.js';
import GPs from '../../data/repos/grandsprix';
import { SUBMIT_EVENT_ID, VOTE_EVENT_ID } from '../../lib/constants';

export default async function handleVotacao(interaction: ButtonInteraction) {
  try {
    const grandprixId = interaction.customId.replace(VOTE_EVENT_ID, '');

    const gp = GPs.get(grandprixId);

    if (!gp) {
      throw new Error(`Grand Prix <${grandprixId}> not found.`);
    }

    const modal = new ModalBuilder()
      .setCustomId(`${SUBMIT_EVENT_ID}${grandprixId}`)
      .setTitle(`Palpites para o ${gp.name} 🏁`);

    const options = [
      ['pole', 'Pole Position'],
      ['p1', 'Primeiro colocado'],
      ['p2', 'Segundo colocado'],
      ['p3', 'Terceiro colocado'],
    ].map(([id, label]) =>
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId(id)
          .setLabel(label)
          .setPlaceholder('Número do piloto')
          .setMaxLength(2)
          .setStyle(TextInputStyle.Short),
      ),
    );

    modal.addComponents(...options);

    await interaction.showModal(modal);
  } catch (error: any) {
    return console.error(`[handleVotacao]: ${error.message}`);
  }
}
