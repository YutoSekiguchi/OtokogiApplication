import axios from "axios";
import { PostPayDataType } from "../@types/pay";
import { returnData } from "./common";

const PAY_API_URL = `${process.env.API_URL}/pays`;

export const postPay = async(data: PostPayDataType) => {
  try {
    const res = await axios.post(PAY_API_URL, data);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}