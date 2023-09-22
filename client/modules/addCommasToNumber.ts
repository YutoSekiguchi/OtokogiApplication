export const addCommasToNumber = (num: number) => {
  // 数字を文字列に変換
  let numberStr = num.toString();
  
  // 正規表現を使用してカンマを挿入
  numberStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return numberStr;
}