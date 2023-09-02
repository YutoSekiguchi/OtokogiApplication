export const getRecordCode = (): string => {
  const timestamp: number = new Date().getTime();
  const firstAlphabet: string = getRandomAlphabets(4);
  const lastAlphabet: string = getRandomAlphabets(4);

  const uniqueID: string = `${firstAlphabet}${timestamp}${lastAlphabet}`;
  return uniqueID;
}

const getRandomAlphabets = (count: number): string => {
  let result = '';
  for (let i = 0; i < count; i++) {
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // 65 corresponds to 'A' in ASCII
    result += randomChar;
  }
  return result;
}