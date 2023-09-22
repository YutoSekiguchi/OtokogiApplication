import { memberNameAndIDType } from "../../@types/user";

export const findDifferentObjects = (array1: memberNameAndIDType[], array2: memberNameAndIDType[]) => {
  // 条件に一致するオブジェクトを格納する配列
  let differentObjects = [];

  // 両方の配列を反復処理
  for (let obj1 of array1) {
    let count = 0
    if (obj1.id === null) {
        if (array2.some(obj2 => obj2.displayName === obj1.displayName)) {
            count += 1
        }
    } else {
        if (array2.some(obj2 => obj2.id === obj1.id)) {
            count += 1
        }
    }

    if (count == 0) {
        differentObjects.push(obj1);
    }
  }

  return differentObjects;
}