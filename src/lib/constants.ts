export const BOT_CHANNEL_NAME = 'bolao-f1-2026';

export const COMMANDS: Record<Command, string> = {
  CLASSIFICACAO: 'classificação',
  CORRIDA: 'corrida',
  CORRIDAS: 'corridas',
  PALPITAR: 'palpitar',
  PARTICIPAR: 'participar',
  PILOTOS: 'pilotos',
};

export const AllCommands = Object.keys(COMMANDS) as Command[];

export const COMMAND_DESCRIPTIONS: Record<string, string> = {
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
