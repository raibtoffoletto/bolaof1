export default function spacer(length: number, ops?: Partial<SpacerOptions>): string {
  const { solid, text }: SpacerOptions = { solid: false, text: '', ...ops };

  return `${text}${new Array(length - text.length).fill(solid ? '─' : ' ').join('')}`;
}
