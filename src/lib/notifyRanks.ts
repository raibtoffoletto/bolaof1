import GPs from '../data/repos/grandsprix';
import PREDICTIONS from '../data/repos/predictions';
import paginate from './paginate';
import spacer from './spacer';

export default async function notifyRanks(
  guildId: string,
  firstPage: MessageCallback,
  followUp: MessageCallback,
  grandprixId?: string,
) {
  const predictions = !!grandprixId
    ? PREDICTIONS.listByGp(grandprixId, guildId)
    : PREDICTIONS.listByGuild(guildId);

  if (predictions.length === 0) {
    return await firstPage(
      'Aguardando o fim da primeira corrida para mostrar a classificação geral do Bolão!',
    );
  }

  const gpName = GPs.get(grandprixId ?? '')?.name;

  const nameLength = Math.max(...predictions.map((p) => p.username.length));

  let header = ` #   │ ${spacer(nameLength, { text: 'Usuário' })} │ Pontos\n`;
  header += `──── │ ${spacer(nameLength, { solid: true })} │ ──────\n`;

  let i = 0;
  for (const _predictions of paginate(predictions, 15)) {
    let content = !!grandprixId
      ? `${gpName}: Classificação da corrida\`\`\``
      : `Classificação geral do Bolão:\`\`\``;

    content += header;

    const position = i * 15 + 1;
    for (const prediction of _predictions) {
      content += ` ${position.toString().padEnd(3, ' ')} │ ${prediction.username} │ ${prediction.points}\n`;
    }

    content += `\`\`\``;

    if (i === 0) {
      await firstPage(content);

      i++;
      continue;
    }

    await followUp(content);
  }
}
