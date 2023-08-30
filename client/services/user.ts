import axios from "axios";
import { PostUserDataType } from "../@types/user";
import { returnData } from "./common";

const USER_API_URL = `${process.env.API_URL}/users`

export const signin = async(data: PostUserDataType) => {
  const url = `${USER_API_URL}/signin`;
  try {
    const res = await axios.post(url, data);
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}

export const login = async(mail: string) => {
  const url = `${USER_API_URL}/login`;
  try {
    var params = new URLSearchParams()
    params.append('mail', mail)
    const res = await axios.post(url, params);
    return returnData(res);
  } catch (error) {
    throw(error)
  }
}

export const getUserByFriendCode = async(friendCode: string) => {
  const url = `${USER_API_URL}/get/${friendCode}/friendcode`;
  try {
    const res = await axios.get(url);
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}