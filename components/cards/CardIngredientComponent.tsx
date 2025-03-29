import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { appColor } from "@/constants/appColor.constant";
import { useRouter } from "expo-router";

interface CardIngredientProps {
  ingredient: {
    id: string;
    ingredientName: string;
    images: { imageUrl: string }[];
    rate: number;
    priceOrigin: number;
    pricePromotion: number;
  };
}

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};

const CardIngredientComponent = ({ ingredient }: CardIngredientProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/ingredient/[id]",
      params: { id: ingredient.id }
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: ingredient.images[0].imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>
          {ingredient.ingredientName}
        </Text>
        <View style={styles.rating}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingText}>{ingredient.rate || "4.9"}</Text>
        </View>
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
      </View>
    </TouchableOpacity>
  );
};

export default CardIngredientComponent;

const styles = StyleSheet.create({
  card: {
    backgroundColor: appColor.WHITE,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: appColor.GRAY3,
  },
  cardContent: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: appColor.TEXT,
    lineHeight: 20,
    marginBottom: 2,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  star: {
    fontSize: 14,
    color: "#FFD700",
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    color: appColor.GRAY1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: appColor.BG_PRIMARY,
  },
  promotionPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: appColor.BG_PRIMARY,
  },
  originalPrice: {
    fontSize: 13,
    color: appColor.GRAY1,
    textDecorationLine: "line-through",
  },
});