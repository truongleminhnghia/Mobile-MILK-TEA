import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { appColor } from "@/constants/appColor.constant";
import CardIngredientComponent from "@/components/cards/CardIngredientComponent";
import CardRecipeComponent from "@/components/cards/CardRecipeComponent";
import { useRouter } from "expo-router";

const Home = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredientData = require("../../services/stores/ingredient.json");
        const recipeData = require("../../services/stores/recipes.json");
        setIngredients(ingredientData.slice(0, 4));
        setRecipes(recipeData.slice(0, 4));
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const viewMoreIngredient = () => {
    router.push("/(tabs)/Ingredient");
  };

  const viewMoreRecipe = () => {
    router.push("/(tabs)/Recipe");
  };

  const navigateToIngredient = (id: string) => {
    router.push({
      pathname: "/ingredient/[id]",
      params: { id }
    });
  };

  const navigateToRecipe = (id: string) => {
    router.push({
      pathname: "/recipe/[id]",
      params: { id }
    });
  };

  const renderSection = (title: string, onViewMore: () => void) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onViewMore} style={styles.viewMoreButton}>
        <Text style={styles.viewMoreText}>Xem thêm</Text>
        <Ionicons name="arrow-forward" size={16} color={appColor.BG_PRIMARY} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Chào mừng đến với</Text>
            <Text style={styles.headerTitle}>Babo station</Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color={appColor.TEXT} />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: "https://gongcha.com.vn/wp-content/uploads/2018/02/Banner-Tr%C3%A0-s%E1%BB%AFa-2.jpg" }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* Featured Ingredients */}
        <View style={styles.section}>
          {renderSection("Nguyên liệu nổi bật", viewMoreIngredient)}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {ingredients.map((item, index) => (
              <View key={index} style={styles.horizontalCard}>
                <CardIngredientComponent ingredient={item} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Featured Recipes */}
        <View style={styles.section}>
          {renderSection("Công thức đề xuất", viewMoreRecipe)}
          <View style={styles.recipeGrid}>
            {recipes.map((recipe, index) => (
              <View key={index} style={styles.recipeCard}>
                <CardRecipeComponent recipe={recipe} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.WHITE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: appColor.TEXT_GRAY,
    fontFamily: "outfit",
  },
  headerTitle: {
    fontSize: 24,
    color: appColor.BG_PRIMARY,
    fontFamily: "outfit-bold",
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: appColor.GRAY3,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerImage: {
    width: "100%",
    height: 160,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "outfit-medium",
    color: appColor.TEXT,
  },
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewMoreText: {
    color: appColor.BG_PRIMARY,
    fontSize: 14,
    fontFamily: "outfit-medium",
  },
  horizontalScroll: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 12,
  },
  horizontalCard: {
    width: 200,
  },
  recipeGrid: {
    paddingHorizontal: 16,
    gap: 16,
  },
  recipeCard: {
    marginBottom: 16,
  },
});

export default Home;
