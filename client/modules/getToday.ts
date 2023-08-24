export const getToday = (): string => {
  const today: Date = new Date();
  const dateString: string = today.toISOString().slice(0, 10);
  return dateString
}