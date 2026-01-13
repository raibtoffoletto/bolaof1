import { type ChatInputCommandInteraction } from 'discord.js';
import { BOT_CHANNEL_NAME, POINTS } from '../../lib/constants';
import getQuote from '../../lib/getQuote';

export default async function handleAjuda(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  try {
    const ajuda = `# 🏁 Bolão da F1 2026

Todo fim de semana de corrida, aparecerá no canal \`#${BOT_CHANNEL_NAME}\` uma mensagem para recolher os palpites, tanto para a sprint se houver, quanto para a corrida. Para participar, basta votar: você deve deixar o seu palpite para quem será o pole position, e o primeiro, segundo e terceiro colocados.

> <‼> Atenção: a votação só fica aberta entre 48h e 24h antes da corrida, após esse período já não é mais possivel palpitar. Portanto, ative notificações para o canal em questão 😉.

## 📜 Pontuação 
Após o resultado de cada corrida, pontos serão atribuidos aos palpites segundo à seguinte tabela:

\`\`\`
       │────────│────────────│
       │ Sprint │ Grand Prix │
│──────│────────│────────────│
│ Pole │    ${POINTS.SPOLE}   │      ${POINTS.POLE}     │
│──────│────────│────────────│
│  P1  │   ${POINTS.SP1}   │     ${POINTS.P1}     │
│──────│────────│────────────│
│  P2  │    ${POINTS.SP2}   │     ${POINTS.P2}     │
│──────│────────│────────────│
│  P3  │    ${POINTS.SP3}   │     ${POINTS.P3}     │
│──────│────────│────────────│
\`\`\`

## ⌨ Comandos

  * \`/ajuda\` Mostra esse documento.
  * \`/classificação\` Mostra a lista de participantes do bolão com os pontos ganhos até o momento.
  * \`/corrida\` Mostra os detalhes de uma corrida da temporada, incluindo resultados e o seu palpite caso estejam disponíveis. A hora mostrada é sempre no seu fuso horário.
  * \`/corridas\` Mostra a lista de corridas com seus códigos.
  * \`/pilotos\` Mostra a lista de pilotos com o número de seus carros e times.

## 💣 Erros

Em caso de algum erro com o Bot, uma frase icônica aparecerá como resposta!`;

    await interaction.editReply({ content: ajuda });
  } catch (error: any) {
    console.error(`[handleAjuda]: ${error.message}`);

    await interaction.editReply({ content: getQuote() });
  }
}
