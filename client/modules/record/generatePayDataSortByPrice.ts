import { PayDataType } from "../../@types/pay";

export const  groupAndSortByPrice = (data: PayDataType[]) => {
  // midごとにデータをグループ化するためのマップを作成
  const groupedData = new Map();

  // データをmidごとにグループ化
  data.forEach(item => {
      const mid = item.mid;
      if (!groupedData.has(mid)) {
          groupedData.set(mid, {
              uid: item.uid,
              mid: mid,
              rid: item.rid,
              totalPrice: 0,
              totalDrive: 0,
              totalDriveBeer: 0
          });
      }

      // 各グループでpriceを合計
      const group = groupedData.get(mid);
      group.totalPrice += item.price;
      group.totalDrive += item.drive;
      group.totalDriveBeer += item.driveBeer;
  });

  // グループ化されたデータを配列に変換
  const groupedArray = Array.from(groupedData.values());

  // priceの合計値が高い順にソート
  groupedArray.sort((a, b) => b.totalPrice - a.totalPrice);

  return groupedArray;
}