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

export interface PayTransitionDataType {
  rid: number;
  mid: number;
  uid: number;
  name: string;
  date: string[];
  transitionPrice: number[];
  transitionDrive: number[];
  transitionDriveBeer: number[];
  lastTransitionPrice: number;
  lastTransitionDrive: number;
  lastTransitionDriveBeer: number;
}