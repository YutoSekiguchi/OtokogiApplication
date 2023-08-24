import axios from "axios";
import { PostRecordDataType } from "../@types/record";
import { returnData } from "./common";


const RECORD_API_URL = `${process.env.API_URL}/records`;

export const postRecord = async(data: PostRecordDataType) => {
  try {
    const res = await axios.post(RECORD_API_URL, data);
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}