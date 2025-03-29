import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const CardIngredientComponent = ({ ingredient }: any) => {
    return (
        <View style={styles.card}>
          <Image
            source={{ uri: ingredient.images[0].imageUrl }}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{ingredient.ingredientName}</Text>
            <View style={styles.rating}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.ratingText}>{ingredient.rate || "4.9"}</Text>
            </View>
            <View>
                <Text>120.000 đ</Text>
            </View>
          </View>
        </View>
      );
};

export default CardIngredientComponent;

const styles = StyleSheet.create({
    card: {
      width: 185,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 3,
      marginBottom: 15,
      overflow: 'hidden', // To make sure the image stays within the square shape
    },
    image: {
      width: '100%',
      height: 150,
      objectFit: 'cover',
    },
    cardContent: {
      padding: 8,
      justifyContent: 'center',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    star: {
      fontSize: 14,
      color: '#FFD700', // Gold color for the star
    },
    ratingText: {
      fontSize: 12,
      color: '#333',
      marginLeft: 5,
    },
    favorite: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: 5,
      borderRadius: 50,
    },
  });