import axios from "axios";
import { returnData } from "./common";
import { PostFriendshipDataType } from "../@types/friendship";

const FRIENDSHIP_API_URL = `${process.env.API_URL}/friendships`;

// uidからそのユーザのフレンドの取得
export const getFriendshipsByUID = async(uid: number) => {
  const url = `${FRIENDSHIP_API_URL}/get/${uid}/myfriend`;
  try {
    const res = await axios.get(url);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}

// friendIDからその人にフレンド申請してるユーザの取得
export const getAppliedUsersByFriendId = async(friendId: number) => {
  const url = `${FRIENDSHIP_API_URL}/get/${friendId}/applied`;
  try {
    const res = await axios.get(url);
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}

export const postFriendship = async(friendship: PostFriendshipDataType) => {
  const url = `${FRIENDSHIP_API_URL}`;
  try {
    const res = await axios.post(url, friendship);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}

// statusの更新
export const putFriendship = async(id: number, status: number) => {
  const url = `${FRIENDSHIP_API_URL}/put/status/${id}/${status}`;
  try {
    const res = await axios.put(url);
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}