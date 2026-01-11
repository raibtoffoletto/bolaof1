export const BOT_CHANNEL_NAME = 'bolao-f1-2026';

export const BOT_EVENT_PREFIX = 'bolaof1:';
export const VOTE_EVENT_ID = `${BOT_EVENT_PREFIX}:vote:`;
export const SUBMIT_EVENT_ID = `${BOT_EVENT_PREFIX}:submit:`;

export const COMMANDS: Record<Command, string> = {
  AJUDA: 'ajuda',
  CLASSIFICACAO: 'classificação',
  CORRIDA: 'corrida',
  CORRIDAS: 'corridas',
  PALPITAR: 'palpitar',
  PARTICIPAR: 'participar',
  PILOTOS: 'pilotos',
};

export const AllCommands = Object.keys(COMMANDS) as Command[];

export const COMMAND_DESCRIPTIONS: Record<string, string> = {
  [COMMANDS.AJUDA]: 'Confira as regras e comandos do bolão',
  [COMMANDS.CLASSIFICACAO]: 'Ver a tabela de classificação dos participantes',
  [COMMANDS.CORRIDA]: 'Ver os resultados de uma corrida específica',
  [COMMANDS.CORRIDAS]: 'Ver a lista de corridas da temporada',
  [COMMANDS.PALPITAR]: 'Palpitar sobre o resultado do próximo GP',
  [COMMANDS.PARTICIPAR]: 'Participar do bolão corrida a corrida',
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
