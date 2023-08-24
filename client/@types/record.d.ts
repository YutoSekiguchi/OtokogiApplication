interface IDAndCreatedAtType {
  id: number;
  createdAt: string;
}

export interface PostRecordDataType {
  title: string;
  date: string;
  totalPrice: number;
}

export interface RecordDataType extends PostRecordDataType, IDAndCreatedAtType {}