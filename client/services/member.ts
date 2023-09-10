import axios from "axios";
import { PostMemberDataType } from "../@types/member";
import { returnData } from "./common";

const MEMBER_API_URL = `${process.env.API_URL}/members`;

export const postMember = async(data: PostMemberDataType) => {
  try {
    const res = await axios.post(MEMBER_API_URL, data);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}

export const getMembersByRID = async(rid: number) => {
  const url = `${MEMBER_API_URL}/get/rid/${rid}`;
  try {
    const res = await axios.get(url);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}