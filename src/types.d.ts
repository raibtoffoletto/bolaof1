type Driver = {
  id: number;
  name: string;
  team: string;
};

type GrandPrix = {
  id: string;
  name: string;
  country: string;
  circuit: string;
  date: number;
  polePosition?: number | null;
  firstPlace?: number | null;
  secondPlace?: number | null;
  thirdPlace?: number | null;
};

type Guild = {
  id: string;
  name: string;
  channelId: string;
};

type User = {
  id: string;
  username: string;
  guildId: string;
};

type Prediction = {
  grandprixId: string;
  userId: string;
  guildId: string;
  polePosition: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
};

type UserPoints = {
  userId: string;
  guildId: string;
  points: number;
};

type Command =
  | 'AJUDA'
  | 'CLASSIFICACAO'
  | 'CORRIDA'
  | 'CORRIDAS'
  | 'PALPITAR'
  | 'PARTICIPAR'
  | 'PILOTOS';
