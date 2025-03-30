import { appInfo } from "../constants/appInfos.constants";
import axiosClient from "./api.customer";

class AccountAPI {
  HandleAccount = async (
    url: string,
    data?: any,
    method: "get" | "post" | "put" | "delete" = "get"
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}/accounts/${url}`, {
      method,
      data,
    });
  };

  getProfile = async () => {
    return await axiosClient(`${appInfo.BASE_URL}/accounts/current`, {
      method: 'get'
    });
  };
}

const accountAPI = new AccountAPI();
export default accountAPI;
