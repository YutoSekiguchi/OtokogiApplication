import axios from "axios";
import { PostPayDataType } from "../@types/pay";
import { returnData } from "./common";

const PAY_API_URL = `${process.env.API_URL}/pays`;

export const getPayByID = async(id: number) => {
  const url = `${PAY_API_URL}/get/${id}`;
  try {
    const res = await axios.get(url);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}

export const getPaysByRID = async(rid: number) => {
  const url = `${PAY_API_URL}/get/${rid}/rid`;
  try {
    const res = await axios.get(url);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}

export const getPayTransitionsByRID = async(rid: number) => {
  const url = `${PAY_API_URL}/get/${rid}/transition`;
  try {
    const res = await axios.get(url);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}

export const postPay = async(data: PostPayDataType) => {
  try {
    const res = await axios.post(PAY_API_URL, data);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}

export const updatePayByID = async(id: number, data: PostPayDataType) => {
  const url = `${PAY_API_URL}/${id}`;
  try {
    const res = await axios.put(url, data);
    return returnData(res);
  } catch(error) {
    throw(error);
  }
}

export const deletePayByID = async(id: number) => {
  const url = `${PAY_API_URL}/${id}`;
  try {
    const res = await axios.delete(url);
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}