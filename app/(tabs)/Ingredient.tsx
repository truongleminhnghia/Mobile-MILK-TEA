import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { appColor } from "../../constants/appColor.constant";
import CardIngredientComponent from "../../components/cards/CardIngredientComponent";
import ingredientAPI from "../../apis/ingredient.api";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";

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

const { width } = Dimensions.get("window");
const numColumns = 2;
const PADDING = 16;
const GAP = 12;
const CARD_WIDTH = (width - PADDING * 2 - GAP) / numColumns;

interface FilterOption {
  id: string;
  label: string;
  sortBy?: string;
  isDescending?: boolean;
}

const filterOptions: FilterOption[] = [
  { id: "related", label: "Liên quan", sortBy: "createAt", isDescending: true },
  { id: "newest", label: "Mới nhất", sortBy: "createAt", isDescending: true },
  {
    id: "priceAsc",
    label: "Giá thấp đến cao",
    sortBy: "priceOrigin",
    isDescending: false,
  },
  {
    id: "priceDesc",
    label: "Giá cao đến thấp",
    sortBy: "priceOrigin",
    isDescending: true,
  },
];

interface APIResponse {
  code: number;
  data: {
    data: Ingredient[];
    pageCurrent: number;
    pageSize: number;
    total: number;
  };
  message: string;
  success: boolean;
}

const Ingredient = () => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("related");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchIngredients = async (pageNumber: number, refresh: boolean = false) => {
    try {
      setLoading(true);
      const currentFilter = filterOptions.find((f) => f.id === selectedFilter);

      const response: AxiosResponse<APIResponse> = await ingredientAPI.search({
        page: pageNumber,
        size: 10,
        sortBy: currentFilter?.sortBy,
        isDescending: currentFilter?.isDescending,
      });

      if (response.data.success) {
        const newIngredients = response.data.data.data;
        setTotal(response.data.data.total);

        if (refresh) {
          setIngredients(newIngredients);
        } else {
          setIngredients((prev) => [...prev, ...newIngredients]);
        }

        setHasMore(
          response.data.data.pageCurrent * response.data.data.pageSize <
          response.data.data.total
        );
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchIngredients(1, true);
  }, [selectedFilter]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchIngredients(nextPage);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchIngredients(1, true);
  }, [selectedFilter]);

  const handleGoToDetail = (id: string) => {
    router.push({
      pathname: "/ingredients/[id]",
      params: { id }
    });
  };

  const renderFilterItem = ({ item }: { item: FilterOption }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === item.id && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(item.id)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === item.id && styles.filterTextActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderIngredientItem = ({ item }: { item: Ingredient }) => (
    <TouchableOpacity 
      style={styles.cardWrapper}
      onPress={() => handleGoToDetail(item.id)}
    >
      <CardIngredientComponent ingredient={item} />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={appColor.BG_PRIMARY} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterListContainer}>
        <FlatList
          data={filterOptions}
          renderItem={renderFilterItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        />
      </View>
      <FlatList
        data={ingredients}
        renderItem={renderIngredientItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[appColor.BG_PRIMARY]}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không tìm thấy nguyên liệu nào</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.WHITE,
  },
  filterListContainer: {
    backgroundColor: appColor.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: appColor.GRAY3,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterContainer: {
    paddingHorizontal: PADDING,
    paddingVertical: 8,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: appColor.WHITE,
  },
  filterButtonActive: {
    backgroundColor: appColor.BG_PRIMARY,
  },
  filterText: {
    color: appColor.TEXT,
    fontSize: 14,
    fontWeight: "500",
  },
  filterTextActive: {
    color: appColor.WHITE,
    fontWeight: "600",
  },
  gridContainer: {
    padding: PADDING,
  },
  columnWrapper: {
    gap: GAP,
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: CARD_WIDTH,
    backgroundColor: appColor.WHITE,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadingFooter: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: appColor.TEXT,
  },
});

export default Ingredient;
