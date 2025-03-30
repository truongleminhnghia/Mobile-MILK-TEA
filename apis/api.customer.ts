import axios from "axios";
import queryString from "query-string";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  // Get token from AsyncStorage
  const token = await AsyncStorage.getItem("accessToken");
  
  config.headers = {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
    ...config.headers,
  };
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data) {
      return res.data;
    }
    throw new Error("Error");
  },
  (error) => {
    console.log(`Error api: ${JSON.stringify(error)}`);
    throw error;
  }
);

export default axiosClient;
