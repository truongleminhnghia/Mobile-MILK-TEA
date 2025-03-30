import { appInfo } from '../constants/appInfos.constants';
import axiosClient from "./api.customer";

class RecipeAPI {
  async getAll() {
    try {
      const response = await axiosClient.get(`${appInfo.BASE_URL}/recipes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const response = await axiosClient.get(`${appInfo.BASE_URL}/recipes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const recipeAPI = new RecipeAPI();
export default recipeAPI;