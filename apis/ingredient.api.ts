import { appInfo } from "../constants/appInfos.constants";
import axiosClient from "./api.customer";

interface Ingredient {
  id: string;
  ingredientCode: string;
  supplier: string;
  ingredientName: string;
  description: string;
  foodSafetyCertification: string;
  expiredDate: string;
  ingredientStatus: "ACTIVE" | "NO_ACTIVE";
  weightPerBag: number;
  quantityPerCarton: number;
  unit: "KG" | "GRAM";
  priceOrigin: number;
  pricePromotion: number;
  category: {
    id: string;
    categoryName: string;
    createAt: string;
    categoryStatus: string;
    categoryType: string;
  };
  isSale: boolean;
  rate: number;
  createAt: string;
  updateAt: string;
  ingredientType: "BOT" | "TRA";
  images: {
    id: string;
    imageUrl: string;
    ingredientId: string;
  }[];
  ingredientQuantities: {
    id: string;
    ingredientId: string;
    quantity: number;
    productType: string;
  }[];
  ingredientReviews: any[];
}

interface PaginatedResponse<T> {
  data: T[];
  pageCurrent: number;
  pageSize: number;
  total: number;
}

interface APIResponse<T> {
  code: number;
  message: string;
  success: boolean;
  data: PaginatedResponse<T>;
}

interface SearchParams {
  search?: string;
  categorySearch?: string;
  categoryId?: string;
  sortBy?: string;
  startDate?: string;
  endDate?: string;
  status?: "ACTIVE" | "NO_ACTIVE";
  ingredientType?: "BOT" | "TRA";
  minPrice?: number;
  maxPrice?: number;
  isSale?: boolean;
  isDescending?: boolean;
  page?: number;
  size?: number;
}

class IngredientAPI {
  HandleIngredient = async (
    url: string,
    data?: any,
    method: "get" | "post" | "put" | "delete" = "get"
  ) => {
    return await axiosClient<APIResponse<Ingredient>>(`${appInfo.BASE_URL}/ingredients/${url}`, {
      method,
      data,
    });
  };

  getAll = async (page: number = 1, size: number = 10) => {
    return await this.HandleIngredient(`search?page=${page}&size=${size}`);
  };

  getById = async (id: string) => {
    return await this.HandleIngredient(`?id=${id}`);
  };

  search = async (params: SearchParams) => {
    const queryParams = new URLSearchParams();
    
    // Add all valid params to query string
    if (params.search) queryParams.append("search", params.search);
    if (params.categorySearch) queryParams.append("categorySearch", params.categorySearch);
    if (params.categoryId) queryParams.append("categoryId", params.categoryId);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.startDate) queryParams.append("startDate", params.startDate);
    if (params.endDate) queryParams.append("endDate", params.endDate);
    if (params.status) queryParams.append("status", params.status);
    if (params.ingredientType) queryParams.append("ingredientType", params.ingredientType);
    if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString());
    if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());
    if (params.isSale !== undefined) queryParams.append("isSale", params.isSale.toString());
    if (params.isDescending !== undefined) queryParams.append("isDescending", params.isDescending.toString());
    
    // Add pagination (adjusting for 1-based pagination)
    queryParams.append("page", ((params.page || 1)).toString());
    queryParams.append("size", (params.size || 10).toString());

    return await this.HandleIngredient(`search?${queryParams.toString()}`);
  };

  getByCategory = async (categoryId: string, page: number = 1, size: number = 10) => {
    return await this.HandleIngredient(`search?categoryId=${categoryId}&page=${page}&size=${size}`);
  };
}

const ingredientAPI = new IngredientAPI();
export default ingredientAPI;
