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

export interface RecordDataType extends PostRecordDataType, IDAndCreatedAtType {}