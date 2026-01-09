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
};

type User = {
  id: string;
  username: string;
  team: string;
};

type Command =
  | 'CLASSIFICACAO'
  | 'CORRIDA'
  | 'CORRIDAS'
  | 'PALPITAR'
  | 'PARTICIPAR'
  | 'PILOTOS';
