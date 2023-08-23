import { AxiosResponse } from "axios";

export const returnData = (res: AxiosResponse<any, any>) => {
  if(res.status === 200) {
    return res.data;
  } else {
    console.log(res);
    return null;
  }
}