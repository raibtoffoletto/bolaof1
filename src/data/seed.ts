import DRIVERS from './repos/drivers';
import GRANDSPRIX from './repos/grandsprix';

const drivers: Driver[] = [
  { id: 10, name: 'Pierre Gasly', team: 'Alpine' },
  { id: 43, name: 'Franco Colapinto', team: 'Alpine' },

  { id: 14, name: 'Fernando Alonso', team: 'Aston Martin' },
  { id: 18, name: 'Lance Stroll', team: 'Aston Martin' },

  { id: 23, name: 'Alexander Albon', team: 'Williams' },
  { id: 55, name: 'Carlos Sainz Jr.', team: 'Williams' },

  { id: 5, name: 'Gabriel Bortoleto', team: 'Audi' },
  { id: 27, name: 'Nico Hülkenberg', team: 'Audi' },

  { id: 11, name: 'Sergio Pérez', team: 'Cadillac' },
  { id: 77, name: 'Valtteri Bottas', team: 'Cadillac' },

  { id: 16, name: 'Charles Leclerc', team: 'Ferrari' },
  { id: 44, name: 'Lewis Hamilton', team: 'Ferrari' },

  { id: 31, name: 'Esteban Ocon', team: 'Haas' },
  { id: 87, name: 'Oliver Bearman', team: 'Haas' },

  { id: 1, name: 'Lando Norris', team: 'McLaren' },
  { id: 81, name: 'Oscar Piastri', team: 'McLaren' },

  { id: 12, name: 'Kimi Antonelli', team: 'Mercedes' },
  { id: 63, name: 'George Russell', team: 'Mercedes' },

  { id: 30, name: 'Liam Lawson', team: 'Racing Bulls' },
  { id: 41, name: 'Arvid Lindblad', team: 'Racing Bulls' },

  { id: 3, name: 'Max Verstappen', team: 'Red Bull' },
  { id: 6, name: 'Isack Hadjar', team: 'Red Bull' },
];

const grandsprix: GrandPrix[] = [
  {
    id: '0',
    name: 'Home Grand Prix',
    country: 'BRA',
    circuit: 'Minha cama, Casinha',
    date: 1768219200000,
  },
  {
    id: '00',
    name: 'Home SPRINT',
    country: 'BRA',
    circuit: 'Minha cama, Casinha',
    date: 1768287600000,
  },
  {
    id: '1',
    name: 'Australian Grand Prix',
    country: 'AUS',
    circuit: 'Albert Park Circuit, Melbourne',
    date: 1772942400000,
  },
  {
    id: '2S',
    name: 'Chinese Sprint',
    country: 'CHN',
    circuit: 'Shanghai International Circuit, Shanghai',
    date: 1773457200000,
  },
  {
    id: '2',
    name: 'Chinese Grand Prix',
    country: 'CHN',
    circuit: 'Shanghai International Circuit, Shanghai',
    date: 1773558000000,
  },
  {
    id: '3',
    name: 'Japanese Grand Prix',
    country: 'JPN',
    circuit: 'Suzuka Circuit, Suzuka',
    date: 1774764000000,
  },
  {
    id: '4',
    name: 'Bahrain Grand Prix',
    country: 'BHR',
    circuit: 'Bahrain International Circuit, Sakhir',
    date: 1776009600000,
  },
  {
    id: '5',
    name: 'Saudi Arabian Grand Prix',
    country: 'SAU',
    circuit: 'Jeddah Corniche Circuit, Jeddah',
    date: 1776621600000,
  },
  {
    id: '6S',
    name: 'Miami Sprint',
    country: 'USA',
    circuit: 'Miami International Autodrome, Miami Gardens, Florida',
    date: 1777741200000,
  },
  {
    id: '6',
    name: 'Miami Grand Prix',
    country: 'USA',
    circuit: 'Miami International Autodrome, Miami Gardens, Florida',
    date: 1777842000000,
  },
  {
    id: '7S',
    name: 'Canadian Sprint',
    country: 'CAN',
    circuit: 'Circuit Gilles Villeneuve, Montreal',
    date: 1779555600000,
  },
  {
    id: '7',
    name: 'Canadian Grand Prix',
    country: 'CAN',
    circuit: 'Circuit Gilles Villeneuve, Montreal',
    date: 1779656400000,
  },
  {
    id: '8',
    name: 'Monaco Grand Prix',
    country: 'MON',
    circuit: 'Circuit de Monaco, Monaco',
    date: 1780840800000,
  },
  {
    id: '9',
    name: 'Barcelona-Catalunya Grand Prix',
    country: 'ESP',
    circuit: 'Circuit de Barcelona-Catalunya, Montmeló',
    date: 1781445600000,
  },
  {
    id: '10',
    name: 'Austrian Grand Prix',
    country: 'AUT',
    circuit: 'Red Bull Ring, Spielberg',
    date: 1782655200000,
  },
  {
    id: '11S',
    name: 'British Sprint',
    country: 'GBR',
    circuit: 'Silverstone Circuit, Silverstone',
    date: 1783166400000,
  },
  {
    id: '11',
    name: 'British Grand Prix',
    country: 'GBR',
    circuit: 'Silverstone Circuit, Silverstone',
    date: 1783263600000,
  },
  {
    id: '12',
    name: 'Belgian Grand Prix',
    country: 'BEL',
    circuit: 'Circuit de Spa-Francorchamps, Stavelot',
    date: 1784469600000,
  },
  {
    id: '13',
    name: 'Hungarian Grand Prix',
    country: 'HUN',
    circuit: 'Hungaroring, Mogyoród',
    date: 1785074400000,
  },
  {
    id: '14S',
    name: 'Dutch Sprint',
    country: 'NLD',
    circuit: 'Circuit Zandvoort, Zandvoort',
    date: 1787407200000,
  },
  {
    id: '14',
    name: 'Dutch Grand Prix',
    country: 'NLD',
    circuit: 'Circuit Zandvoort, Zandvoort',
    date: 1787493600000,
  },
  {
    id: '15',
    name: 'Italian Grand Prix',
    country: 'ITA',
    circuit: 'Monza Circuit, Monza',
    date: 1788703200000,
  },
  {
    id: '16',
    name: 'Spanish Grand Prix',
    country: 'ESP',
    circuit: 'Madring, Madrid',
    date: 1789308000000,
  },
  {
    id: '17',
    name: 'Azerbaijan Grand Prix',
    country: 'AZE',
    circuit: 'Baku City Circuit, Baku',
    date: 1790424000000,
  },
  {
    id: '18S',
    name: 'Singapore Sprint',
    country: 'SGP',
    circuit: 'Marina Bay Street Circuit, Singapore',
    date: 1791626400000,
  },
  {
    id: '18',
    name: 'Singapore Grand Prix',
    country: 'SGP',
    circuit: 'Marina Bay Street Circuit, Singapore',
    date: 1791723600000,
  },
  {
    id: '19',
    name: 'United States Grand Prix',
    country: 'USA',
    circuit: 'Circuit of the Americas, Austin, Texas',
    date: 1792958400000,
  },
  {
    id: '20',
    name: 'Mexico City Grand Prix',
    country: 'MEX',
    circuit: 'Autódromo Hermanos Rodríguez, Mexico City',
    date: 1793563200000,
  },
  {
    id: '21',
    name: 'São Paulo Grand Prix',
    country: 'BRA',
    circuit: 'Interlagos Circuit, São Paulo',
    date: 1794157200000,
  },
  {
    id: '22',
    name: 'Las Vegas Grand Prix',
    country: 'USA',
    circuit: 'Las Vegas Strip Circuit, Paradise, Nevada',
    date: 1795320000000,
  },
  {
    id: '23',
    name: 'Qatar Grand Prix',
    country: 'QAT',
    circuit: 'Lusail International Circuit, Lusail',
    date: 1795968000000,
  },
  {
    id: '24',
    name: 'Abu Dhabi Grand Prix',
    country: 'ARE',
    circuit: 'Yas Marina Circuit, Abu Dhabi',
    date: 1796562000000,
  },
];

export default function seedData() {
  if (DRIVERS.list().length === 0) {
    console.log('[seedData]: Seeding drivers data...');

    for (const driver of drivers) {
      DRIVERS.create(driver);
    }
  }

  if (GRANDSPRIX.list().length === 0) {
    console.log('[seedData]: Seeding grandsprix data...');

    for (const gp of grandsprix) {
      GRANDSPRIX.create(gp);
    }
  }
}
