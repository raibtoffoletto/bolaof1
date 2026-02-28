import type { ModalSubmitInteraction } from 'discord.js';
import DRIVERS from '../../data/repos/drivers';
import GPs from '../../data/repos/grandsprix';
import PREDICTIONS from '../../data/repos/predictions';
import USERS from '../../data/repos/users';
import { SUBMIT_VOTE_EVENT_ID } from '../../lib/constants';
import getQuote from '../../lib/getQuote';

function verifyUser(interaction: ModalSubmitInteraction) {
  const userId = interaction.user.id;
  const guildId = interaction.guild?.id ?? '';

  if (!userId || !guildId) {
    throw new Error('User or Guild ID not found in interaction.');
  }

  const user = USERS.get(userId, guildId);
  if (!user) {
    USERS.create({
      id: userId,
      guildId,
      username: interaction.user.username,
    });
  }

  return [userId, guildId];
}

export default async function handlePalpitar(interaction: ModalSubmitInteraction) {
  await interaction.deferReply({ ephemeral: true });

  try {
    const grandprixId = interaction.customId.replace(SUBMIT_VOTE_EVENT_ID, '');
    const gp = GPs.get(grandprixId);

    if (!gp) {
      throw new Error(`Grand Prix <${grandprixId}> not found.`);
    }

    const [userId, guildId] = verifyUser(interaction);

    const pole = Number(interaction.fields.getStringSelectValues('pole'));
    const p1 = Number(interaction.fields.getStringSelectValues('p1'));
    const p2 = Number(interaction.fields.getStringSelectValues('p2'));
    const p3 = Number(interaction.fields.getStringSelectValues('p3'));

    if (
      !pole ||
      !p1 ||
      !p2 ||
      !p3 ||
      isNaN(pole) ||
      isNaN(p1) ||
      isNaN(p2) ||
      isNaN(p3)
    ) {
      return await interaction.editReply({
        content: '🚨 Preencha, por favor, todos os campos corretamente!',
      });
    }

    const driverIds = DRIVERS.list().map((d) => d.id);

    for (const id of [pole, p1, p2, p3]) {
      if (!driverIds.includes(id)) {
        return await interaction.editReply({
          content: `🚨 Ooops, não achei um piloto com número ${id}!`,
        });
      }
    }

    if (p1 === p2 || p2 === p3 || p1 === p3) {
      return await interaction.editReply({
        content: '🚨 O mesmo piloto não pode estar em dois lugares no podium 😉!',
      });
    }

    const prediction: Prediction = {
      userId,
      grandprixId,
      guildId,
      polePosition: pole,
      firstPlace: p1,
      secondPlace: p2,
      thirdPlace: p3,
      points: 0,
    };

    const _prediction = PREDICTIONS.get(grandprixId, userId, guildId);
    if (!!_prediction) {
      PREDICTIONS.update(prediction);
    } else {
      PREDICTIONS.create(prediction);
    }

    await interaction.editReply({
      content: '🎉 Palpite registrado. Boa Sorte! 🏁',
    });
  } catch (error: any) {
    console.error(`[handlePalpitar]: ${error.message}`);

    await interaction.editReply({
      content: getQuote(),
    });
  }
}
