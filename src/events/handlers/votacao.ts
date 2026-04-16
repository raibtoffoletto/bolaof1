import {
  LabelBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  type ButtonInteraction,
  type SelectMenuComponentOptionData,
} from 'discord.js';
import DRIVERS from '../../data/repos/drivers';
import GPs from '../../data/repos/grandsprix';
import predictions from '../../data/repos/predictions';
import {
  P1,
  P2,
  P3,
  POLE,
  START_VOTING_EVENT_ID,
  SUBMIT_VOTE_EVENT_ID,
} from '../../lib/constants';
import getPodiumLabel from '../../lib/getPodiumLabel';
import { isTooLate } from '../../lib/manageGpMessages';

async function openModal(
  interaction: ButtonInteraction,
  gp: GrandPrix,
  userPrediction: Prediction | null,
) {
  const modal = new ModalBuilder()
    .setCustomId(`${SUBMIT_VOTE_EVENT_ID}${gp.id}`)
    .setTitle(`Palpites para o ${gp.name} 🏁`);

  const drivers = DRIVERS.list();
  const driverOptions = drivers.map((d) => ({ label: d.name, value: `${d.id}` }));
  driverOptions.sort((a, b) => a.label.localeCompare(b.label));

  const sufixLabel = (label: string, id?: number) =>
    !!userPrediction ? `${label} «${drivers.find((d) => d.id === id)?.name}»` : label;

  const _pole = sufixLabel(POLE, userPrediction?.polePosition);
  const _p1 = sufixLabel(P1, userPrediction?.firstPlace);
  const _p2 = sufixLabel(P2, userPrediction?.secondPlace);
  const _p3 = sufixLabel(P3, userPrediction?.thirdPlace);

  const getOptions = (id?: number): SelectMenuComponentOptionData[] =>
    !!id
      ? driverOptions.map((d) => ({ ...d, default: d.value === `${id}` }))
      : driverOptions.slice();

  const options: [string, string, any][] = [
    ['pole', _pole, getOptions(userPrediction?.polePosition)],
    ['p1', _p1, getOptions(userPrediction?.firstPlace)],
    ['p2', _p2, getOptions(userPrediction?.secondPlace)],
    ['p3', _p3, getOptions(userPrediction?.thirdPlace)],
  ];

  const components = options.map(([id, label, _options]) =>
    new LabelBuilder()
      .setLabel(label)
      .setStringSelectMenuComponent(
        new StringSelectMenuBuilder().setCustomId(id).addOptions(..._options),
      ),
  );

  modal.addComponents(...components);

  await interaction.showModal(modal);
}

export default async function handleVotacao(interaction: ButtonInteraction) {
  try {
    const grandprixId = interaction.customId.replace(START_VOTING_EVENT_ID, '');

    const gp = GPs.get(grandprixId);

    if (!gp) {
      throw new Error(`Grand Prix <${grandprixId}> not found.`);
    }

    const userPrediction = predictions.get(
      grandprixId,
      interaction.user.id,
      interaction.guildId ?? '',
    );

    if (isTooLate(gp.id, gp.date)) {
      if (!!userPrediction) {
        let content = `🏁 Meu palpite para o ${gp.name} 🏁:\n\n`;
        content += getPodiumLabel(
          userPrediction.polePosition,
          userPrediction.firstPlace,
          userPrediction.secondPlace,
          userPrediction.thirdPlace,
        );

        if (!!gp.polePosition) {
          content += '\n🏆 Pontos ganhos: ' + userPrediction.points;
        }

        return await interaction.reply({
          content,
          ephemeral: true,
        });
      }

      return await interaction.reply({
        content: 'Desculpe, o tempo para votar nesse GP acabou! ⏰',
        ephemeral: true,
      });
    }

    await openModal(interaction, gp, userPrediction);
  } catch (error: any) {
    console.error(`[handleVotacao]: ${error.message}`);
    console.error(error);
  }
}
