import { appInfo } from "../constants/appInfos.constants";
import axiosClient from "./api.customer";

class AuthAPI {
  HandleAuthentication = async (
    url: string,
    data?: any,
    method?: "get" | "post" | "put" | "delete"
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}/auths/${url}`, {
      method: method ?? 'get',
      data,
    })
  };
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI
