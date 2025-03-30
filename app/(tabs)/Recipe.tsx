import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { appColor } from '../../constants/appColor.constant';
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
}

interface APIResponse {
  code: number;
  message: string;
  success: boolean;
  data: Recipe[];
}

const Recipe = () => {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setError(null);
      const response = await recipeAPI.getAll() as APIResponse;
      if (response.success) {
        setRecipes(response.data);
      } else {
        setError('Không thể tải danh sách công thức');
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
      setError('Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecipes();
  };

  const handleRecipePress = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => handleRecipePress(item.id)}
    >
      <Image
        source={{ 
          uri: item.images && item.images.length > 0 
            ? item.images[0].imageUrl 
            : 'https://via.placeholder.com/300'
        }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeCategory}>{item.category.categoryName}</Text>
        <Text style={styles.recipeName}>{item.recipeName}</Text>
        <Text style={styles.recipeDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appColor.BG_PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchRecipes}>
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
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
  listContainer: {
    padding: 16,
  },
  recipeCard: {
    backgroundColor: appColor.WHITE,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recipeInfo: {
    padding: 16,
  },
  recipeCategory: {
    fontSize: 14,
    color: appColor.TEXT_GRAY,
    fontFamily: 'outfit',
    marginBottom: 4,
  },
  recipeName: {
    fontSize: 18,
    color: appColor.TEXT,
    fontFamily: 'outfit-bold',
    marginBottom: 8,
  },
  recipeDescription: {
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

export default Recipe;