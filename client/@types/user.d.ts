interface IDAndCreatedAtType {
  id: number;
  createdAt: string;
}

export interface PostUserDataType {
  name: string;
  displayName: string | null;
  mail: string;
  image: string;
  friendCode: string;
}

export interface UserDataType extends PostUserDataType, IDAndCreatedAtType {}

export interface FriendCardPropsType {
  user: UserDataType;
}

export interface memberNameAndIDType {
  id: number | null;
  displayName: string;
  image: string;
}