export const BOT_CHANNEL_NAME = 'bolao-f1-2026';

export const BOT_EVENT_PREFIX = 'bolaof1:';
export const VOTE_EVENT_ID = `${BOT_EVENT_PREFIX}:vote:`;
export const SUBMIT_EVENT_ID = `${BOT_EVENT_PREFIX}:submit:`;

export const POLE = '⏱ Pole Position';
export const P1 = '🥇 Primeiro colocado';
export const P2 = '🥈 Segundo colocado';
export const P3 = '🥉 Terceiro colocado';

export const POINTS = {
  SPOLE: 3,
  SP1: 10,
  SP2: 8,
  SP3: 6,
  POLE: 5,
  P1: 25,
  P2: 18,
  P3: 15,
};

export const COMMANDS: Record<Command, string> = {
  AJUDA: 'ajuda',
  CLASSIFICACAO: 'classificação',
  CORRIDA: 'corrida',
  CORRIDAS: 'corridas',
  PILOTOS: 'pilotos',
};

export const AllCommands = Object.keys(COMMANDS) as Command[];

export const COMMAND_DESCRIPTIONS: Record<string, string> = {
  [COMMANDS.AJUDA]: 'Confira as regras e comandos do bolão',
  [COMMANDS.CLASSIFICACAO]: 'Ver a tabela de classificação dos participantes',
  [COMMANDS.CORRIDA]: 'Ver os resultados de uma corrida específica',
  [COMMANDS.CORRIDAS]: 'Ver a lista de corridas da temporada',
  [COMMANDS.PILOTOS]: 'Ver a lista de pilotos',
};

export const COMMAND_OPTIONS: Record<string, string[][]> = {
  [COMMANDS.CORRIDA]: [
    ['corrida', 'Número da corrida, use `/corridas` para ver a lista completa'],
  ],
};

export const FLAGS: Record<string, string> = {
  AUS: '🇦🇺',
  CHN: '🇨🇳',
  JPN: '🇯🇵',
  BHR: '🇧🇭',
  SAU: '🇸🇦',
  USA: '🇺🇸',
  CAN: '🇨🇦',
  MON: '🇲🇨',
  ESP: '🇪🇸',
  AUT: '🇦🇹',
  GBR: '🇬🇧',
  BEL: '🇧🇪',
  HUN: '🇭🇺',
  NLD: '🇳🇱',
  ITA: '🇮🇹',
  AZE: '🇦🇿',
  SGP: '🇸🇬',
  MEX: '🇲🇽',
  BRA: '🇧🇷',
  QAT: '🇶🇦',
  ARE: '🇦🇪',
};

export const HELP_TEXT = `# 🏁 Bem-vindos ao Bolão da F1 2026 

Todo fim de semana de corrida, uma mensagem aparecerá neste canal (\`#${BOT_CHANNEL_NAME}\`) com os detalhes da corrida (e sprint se houver) e com um formulário para você deixar seus palpites sobre quem fará a pole e quem estará no podium. Para participar, basta votar utilizando o botão presente na mensagem, e ao fim de cada corrida para cada palpite você ganhará pontos para a classificação geral.

> <‼> Atenção: a votação só fica aberta entre 48h e 24h antes da corrida, após esse período já não é mais possivel palpitar. Portanto, ative notificações para o canal em questão e fique atento às mensagens para não perder nenhuma novidade 😉!.

## 📜 Pontuação 
Após o resultado de cada corrida, pontos serão atribuidos para a sua classificação geral aos palpites segundo à seguinte tabela:

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
