export const findDifferentObjects = (array1: any[], array2: any[]) => {
  // 条件に一致するオブジェクトを格納する配列
  let differentObjects = [];

  // 両方の配列を反復処理
  for (let obj1 of array1) {
      for (let obj2 of array2) {
          // idがnull以外でidが異なるもしくはidがnullで名前が異なる場合
          if (
              (obj1.id !== null && obj2.id !== null && obj1.id !== obj2.id) ||
              (obj1.id === null && obj2.id !== null) ||
              (obj1.id !== null && obj2.id === null) ||
              obj1.name !== obj2.name
          ) {
              differentObjects.push(obj1);
              break; // 条件に一致するオブジェクトが見つかったらループを抜けます
          }
      }
  }

  return differentObjects;
}