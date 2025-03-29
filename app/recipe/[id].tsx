import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { appColor } from '@/constants/appColor.constant';
import { Ionicons } from '@expo/vector-icons';

interface RecipeDetail {
  id: string;
  recipeTitle: string;
  content: string;
  imageUrl: string;
  recipeStatus: string;
  recipeLevel: string;
  category: {
    categoryName: string;
    createAt: string;
  };
  ingredients: {
    id: string;
    ingredientName: string;
    images: { imageUrl: string }[];
    priceOrigin: number;
  }[];
  ingredientRecipeResponse: {
    ingredientId: string;
    ingredientName: string;
    weightOfIngredient: number;
  }[];
}

const RecipeDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = require('../../services/stores/recipes.json');
        const found = data.find((item: RecipeDetail) => item.id === id);
        setRecipe(found);
      } catch (error) {
        console.error('Error loading recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={appColor.TEXT} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color={appColor.TEXT} />
          </TouchableOpacity>
        </View>

        {/* Main Image */}
        <Image
          source={{ uri: recipe.imageUrl }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.category}>{recipe.category.categoryName}</Text>
            <Text style={styles.title}>{recipe.recipeTitle}</Text>
            <Text style={styles.date}>
              Ngày tạo: {formatDate(recipe.category.createAt)}
            </Text>
          </View>

          {/* Ingredients Section */}
          <View style={styles.ingredientsSection}>
            <Text style={styles.sectionTitle}>Nguyên liệu cần thiết</Text>
            {recipe.ingredientRecipeResponse.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.ingredientItem}
                onPress={() => router.push(`/ingredient/${item.ingredientId}`)}
              >
                <View style={styles.ingredientInfo}>
                  <Text style={styles.ingredientName}>{item.ingredientName}</Text>
                  <Text style={styles.ingredientWeight}>
                    {item.weightOfIngredient} kg
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={appColor.TEXT} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Recipe Content */}
          <View style={styles.recipeContent}>
            <Text style={styles.sectionTitle}>Hướng dẫn thực hiện</Text>
            <Text style={styles.description}>{recipe.content}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Mua nguyên liệu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.WHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: appColor.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: appColor.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 24,
  },
  category: {
    fontSize: 14,
    color: appColor.TEXT_GRAY,
    fontFamily: 'outfit',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    color: appColor.TEXT,
    fontFamily: 'outfit-bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: appColor.TEXT_GRAY,
    fontFamily: 'outfit',
  },
  ingredientsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: appColor.TEXT,
    fontFamily: 'outfit-medium',
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: appColor.GRAY3,
    borderRadius: 12,
    marginBottom: 8,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    color: appColor.TEXT,
    fontFamily: 'outfit-medium',
    marginBottom: 4,
  },
  ingredientWeight: {
    fontSize: 14,
    color: appColor.TEXT_GRAY,
    fontFamily: 'outfit',
  },
  recipeContent: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: appColor.TEXT,
    fontFamily: 'outfit',
    lineHeight: 24,
  },
  actionButton: {
    backgroundColor: appColor.BG_PRIMARY,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: appColor.WHITE,
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
});

export default RecipeDetail; 