export default function spacer(length: number, ops?: Partial<SpacerOptions>): string {
  const { solid, text }: SpacerOptions = { solid: false, text: '', ...ops };

  const arrLength = Math.max(length - text.length, text.length);

  return `${text}${new Array(arrLength).fill(solid ? '─' : ' ').join('')}`;
}
