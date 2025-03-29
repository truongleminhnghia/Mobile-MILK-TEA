import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { appColor } from '@/constants/appColor.constant';
import { Ionicons } from '@expo/vector-icons';

interface IngredientDetail {
  id: string;
  ingredientName: string;
  description: string;
  supplier: string;
  foodSafetyCertification: string;
  expiredDate: string;
  weightPerBag: number;
  quantityPerCarton: number;
  unit: string;
  priceOrigin: number;
  pricePromotion: number;
  images: { imageUrl: string }[];
  category: {
    categoryName: string;
  };
  ingredientQuantities: {
    quantity: number;
    productType: string;
  }[];
}

const IngredientDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [ingredient, setIngredient] = useState<IngredientDetail | null>(null);

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const data = require('../../services/stores/ingredient.json');
        const found = data.find((item: IngredientDetail) => item.id === id);
        setIngredient(found);
      } catch (error) {
        console.error('Error loading ingredient:', error);
      }
    };
    fetchIngredient();
  }, [id]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  if (!ingredient) {
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
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color={appColor.TEXT} />
          </TouchableOpacity>
        </View>

        {/* Images */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}
        >
          {ingredient.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.category}>{ingredient.category.categoryName}</Text>
          <Text style={styles.title}>{ingredient.ingredientName}</Text>
          
          {/* Pricing */}
          <View style={styles.priceContainer}>
            {ingredient.pricePromotion > 0 ? (
              <>
                <Text style={styles.promotionPrice}>
                  {formatPrice(ingredient.pricePromotion)}
                </Text>
                <Text style={styles.originalPrice}>
                  {formatPrice(ingredient.priceOrigin)}
                </Text>
              </>
            ) : (
              <Text style={styles.price}>{formatPrice(ingredient.priceOrigin)}</Text>
            )}
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nhà cung cấp</Text>
              <Text style={styles.detailValue}>{ingredient.supplier}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Chứng nhận</Text>
              <Text style={styles.detailValue}>{ingredient.foodSafetyCertification}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Hạn sử dụng</Text>
              <Text style={styles.detailValue}>{formatDate(ingredient.expiredDate)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Khối lượng/Túi</Text>
              <Text style={styles.detailValue}>{ingredient.weightPerBag} {ingredient.unit}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Số lượng/Thùng</Text>
              <Text style={styles.detailValue}>{ingredient.quantityPerCarton}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
            <Text style={styles.description}>{ingredient.description}</Text>
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
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
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: appColor.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: '100%',
    height: 300,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  price: {
    fontSize: 24,
    color: appColor.BG_PRIMARY,
    fontFamily: 'outfit-bold',
  },
  promotionPrice: {
    fontSize: 24,
    color: appColor.BG_PRIMARY,
    fontFamily: 'outfit-bold',
  },
  originalPrice: {
    fontSize: 16,
    color: appColor.TEXT_GRAY,
    textDecorationLine: 'line-through',
    fontFamily: 'outfit',
  },
  detailsContainer: {
    backgroundColor: appColor.GRAY3,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: appColor.TEXT_GRAY,
    fontFamily: 'outfit',
  },
  detailValue: {
    fontSize: 14,
    color: appColor.TEXT,
    fontFamily: 'outfit-medium',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    color: appColor.TEXT,
    fontFamily: 'outfit-medium',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: appColor.TEXT,
    fontFamily: 'outfit',
    lineHeight: 20,
  },
  addToCartButton: {
    backgroundColor: appColor.BG_PRIMARY,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: appColor.WHITE,
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
});

export default IngredientDetail; 