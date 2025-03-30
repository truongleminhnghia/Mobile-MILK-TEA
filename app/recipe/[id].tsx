import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { appColor } from '../../constants/appColor.constant';
import { Ionicons } from '@expo/vector-icons';
import recipeAPI from '../../apis/recipe.api';

interface Recipe {
  id: string;
  recipeName: string;
  description: string;
  recipeStatus: string;
  recipeType: string;
  createAt: string;
  updateAt: string;
  images: {
    id: string;
    imageUrl: string;
    recipeId: string;
  }[];
  category: {
    id: string;
    categoryName: string;
    categoryStatus: string;
    categoryType: string;
    createAt: string;
  };
  ingredients: {
    id: string;
    quantity: number;
    unit: string;
    ingredient: {
      id: string;
      ingredientName: string;
    };
  }[];
  steps: {
    id: string;
    stepNumber: number;
    description: string;
  }[];
}

interface APIResponse {
  code: number;
  message: string;
  success: boolean;
  data: Recipe;
}

const RecipeDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await recipeAPI.getById(id as string) as APIResponse;
      if (response.success) {
        console.log(response.data);
        setRecipe(response.data);
      } else {
        setError('Không thể tải thông tin công thức');
      }
    } catch (error) {
      console.error('Error loading recipe:', error);
      setError('Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appColor.BG_PRIMARY} />
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchRecipe}>
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
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

        {/* Images */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}
        >
          {recipe.images && recipe.images.length > 0 ? (
            recipe.images.map((image) => (
              <Image
                key={image.id}
                source={{ uri: image.imageUrl }}
                style={[styles.image, { width: Dimensions.get('window').width }]}
                resizeMode="cover"
              />
            ))
          ) : (
            <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
              <Text>Không có hình ảnh</Text>
            </View>
          )}
        </ScrollView>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.category}>{recipe.category.categoryName}</Text>
          <Text style={styles.title}>{recipe.recipeName}</Text>
          
          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{recipe.description}</Text>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nguyên liệu</Text>
            {recipe.ingredients.map((item) => (
              <View key={item.id} style={styles.ingredientItem}>
                <Text style={styles.ingredientName}>{item.ingredient.ingredientName}</Text>
                <Text style={styles.ingredientQuantity}>
                  {item.quantity} {item.unit}
                </Text>
              </View>
            ))}
          </View>

          {/* Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Các bước thực hiện</Text>
            {recipe.steps
              .sort((a, b) => a.stepNumber - b.stepNumber)
              .map((step) => (
                <View key={step.id} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
                  </View>
                  <Text style={styles.stepDescription}>{step.description}</Text>
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
  imageContainer: {
    height: 300,
    width: '100%',
  },
  image: {
    height: 300,
    backgroundColor: appColor.GRAY3,
  },
  content: {
    padding: 16,
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
    marginBottom: 12,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    color: appColor.TEXT,
    fontFamily: 'outfit',
    lineHeight: 20,
  },
  section: {
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
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: appColor.GRAY3,
  },
  ingredientName: {
    fontSize: 14,
    color: appColor.TEXT,
    fontFamily: 'outfit',
  },
  ingredientQuantity: {
    fontSize: 14,
    color: appColor.TEXT_GRAY,
    fontFamily: 'outfit',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: appColor.BG_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: appColor.WHITE,
    fontSize: 14,
    fontFamily: 'outfit-medium',
  },
  stepDescription: {
    flex: 1,
    fontSize: 14,
    color: appColor.TEXT,
    fontFamily: 'outfit',
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: appColor.TEXT,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: appColor.BG_PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: appColor.WHITE,
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
});

export default RecipeDetail; 