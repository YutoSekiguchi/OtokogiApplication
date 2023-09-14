import { IDAndCreatedAtType } from "./common";

export interface PostPayDataType {
  rid: number;
  mid: number;
  uid: number;
  otherUids: string;
  price: number;
  drive: number;
  driveBeer: number;
  detail: string;
  date: string;
}

export interface PayDataType extends PostPayDataType, IDAndCreatedAtType {}