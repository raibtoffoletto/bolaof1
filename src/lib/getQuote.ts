export default function getQuote() {
  const quotes = [
    '“Oh no! Mi shoooesss!” L. Norris',
    '“All the time, you have to leave a space!” F. Alonso',
    '“I have the seat full of water... like, full of water” C. Leclerc',
    '“A trophy for the hero of race.” F. Alonso',
    "“I'm stupid!” C. Leclerc",
    '“GP2 engine! GP2 engine.” F. Alonso',
    "“Have a tea break while you're at it, come on!” L. Hamilton",
    "“Leave me alone, I know what I'm doing!” K. Räikkönen",
    "“I'm hanging on like a cow on ice!” V. Bottas",
    "“I'm driving like a grandma!” L. Hamilton",
    '“Who let the dogs out?” L. Hamilton',
    '“I need more power, give me more power!” M. Verstappen',
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);

  return `💣 ${quotes[randomIndex]} 💣`;
}
