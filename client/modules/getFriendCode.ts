export const getFriendCode = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2); // 年の語尾2文字を取得
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月（0-indexedなので+1する）
  const day = currentDate.getDate().toString().padStart(2, '0'); // 日
  const hours = currentDate.getHours().toString().padStart(2, '0'); // 時
  const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // 分
  const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // 秒


  const dateID = `${year}${month}${day}${hours}${minutes}${seconds}`;
  const randomStringID = generateRandomString(4);
  
  const friendCode = dateID + randomStringID;

  return friendCode;
}

const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }
  return result;
}