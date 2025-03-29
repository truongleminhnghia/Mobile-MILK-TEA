import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { appColor } from '@/constants/appColor.constant';
import { useRouter } from 'expo-router';

interface CardRecipeProps {
  recipe: {
    id: string;
    recipeTitle: string;
    imageUrl: string;
    category: {
      createAt: string;
      categoryName: string;
    };
  };
}

const CardRecipeComponent = ({ recipe }: CardRecipeProps) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handlePress = () => {
    router.push({
      pathname: "/recipe/[id]",
      params: { id: recipe.id }
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: recipe.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {recipe.recipeTitle}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.date}>
            {formatDate(recipe.category.createAt)}
          </Text>
          <Text style={styles.category} numberOfLines={1}>
            {recipe.category.categoryName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: appColor.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: appColor.TEXT,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: appColor.TEXT_GRAY,
    fontFamily: 'outfit',
  },
  category: {
    fontSize: 12,
    color: appColor.BG_PRIMARY,
    fontFamily: 'outfit-medium',
    flex: 1,
    textAlign: 'right',
  },
});

export default CardRecipeComponent; 