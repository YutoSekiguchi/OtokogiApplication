export const  stringToNumberArray = (inputString: string) => {
  // カンマで文字列を分割し、各部分を数値に変換して配列に格納
  const stringArray = inputString.split(',');
  const numberArray = stringArray.map(item => parseFloat(item.trim()));

  return numberArray;
}