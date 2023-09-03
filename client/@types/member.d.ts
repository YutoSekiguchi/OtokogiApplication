interface IDAndCreatedAtType {
  id: number;
  createdAt: string;
}

export interface PostMemberDataType {
  rid: number;
  name: string;
  uid: number;
  ranking: number;
  totalPrice: number;
  totalDrive: number;
  totalWin: number;
}

export interface MemberDataType extends PostMemberDataType, IDAndCreatedAtType {}