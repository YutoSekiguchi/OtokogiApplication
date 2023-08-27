interface IDAndCreatedAtType {
  id: number;
  createdAt: string;
}

export interface PostFriendshipDataType {
  uid: number;
  friendId: number;
  status: number;
}

export interface FriendshipDataType extends PostUserDataType, IDAndCreatedAtType {}
