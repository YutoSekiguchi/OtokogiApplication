export const generateDayFormat = (date: string) => {
  const splitDate = date.split("-");
  const res = `${splitDate[1]}/${splitDate[2]}`;
  return res;
}