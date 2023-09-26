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
  priceDetail: string[];
  priceDate: string[];
  driveDate: string[];
  driveBeerDate: string[];
  transitionPrice: number[];
  transitionDrive: number[];
  transitionDriveBeer: number[];
  lastTransitionPrice: number;
  lastTransitionDrive: number;
  lastTransitionDriveBeer: number;
}

export interface PayTransitionLineGraphDataType {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension?: number;
}