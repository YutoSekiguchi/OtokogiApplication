interface IDAndCreatedAtType {
  id: number;
  createdAt: string;
}

export interface PostRecordDataType {
  title: string;
  date: string;
  totalPrice: number;
  urlCode: string;
}

export interface RankingDataType {
  uid: number;
  mid: number;
  rid: number;
  totalPrice: number;
  totalDrive: number;
  totalDriveBeer: number;
}

export interface RecordDataType extends PostRecordDataType, IDAndCreatedAtType {}