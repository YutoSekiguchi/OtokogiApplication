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

export const getRecordByURLCode = async(urlCode: string) => {
  const url = `${RECORD_API_URL}/get/urlcode/${urlCode}`
  try {
    const res = await axios.get(url);
    console.log(res)
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}

export const getRecordsByUID = async(uid: number) => {
  const url = `${RECORD_API_URL}/get/uid/${uid}`;
  try {
    const res = await axios.get(url);
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}

export const updateRecordByID = async (id: number, data: PostRecordDataType) => {
  const url = `${RECORD_API_URL}/${id}`;
  try {
    const res = await axios.put(url, data);
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}

export const updateRecordTitleByID = async (id: number, title: string) => {
  const url = `${RECORD_API_URL}/${id}/change/title?newTitle=${title}`;
  try {
    const res = await axios.put(url);
    return returnData(res);
  } catch (error) {
    throw(error);
  }
}