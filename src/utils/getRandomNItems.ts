export default function getRandomNItems<T>(arr: T[], n: number): T[] {
  const shuffled = arr.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
