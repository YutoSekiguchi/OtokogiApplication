import { AxiosResponse } from "axios";

export const returnData = (res: AxiosResponse<any, any>) => {
  if(res.status === 200) {
    if (res.data === "") {
      return null;
    }
    return res.data;
  } else {
    console.log(res);
    return null;
  }
}