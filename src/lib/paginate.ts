export default function paginate<T>(items: T[], pageSize = 10): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += pageSize) {
    chunks.push(items.slice(i, i + pageSize));
  }

  return chunks;
}
