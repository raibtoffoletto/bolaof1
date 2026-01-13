import DRIVERS from '../data/repos/drivers';
import { P1, P2, P3, POLE } from '../lib/constants';

export default function getPodiumLabel(pole: number, p1: number, p2: number, p3: number) {
  const drivers = DRIVERS.list();
  const dPole = drivers.find((x) => x.id === pole);
  const dP1 = drivers.find((x) => x.id === p1);
  const dP2 = drivers.find((x) => x.id === p2);
  const dP3 = drivers.find((x) => x.id === p3);

  let content = `${POLE}: **${dPole?.name}** (${dPole?.id})\n`;
  content += `${P1}: **${dP1?.name}** (${dP1?.id})\n`;
  content += `${P2}: **${dP2?.name}** (${dP2?.id})\n`;
  content += `${P3}: **${dP3?.name}** (${dP3?.id})\n`;

  return content;
}
