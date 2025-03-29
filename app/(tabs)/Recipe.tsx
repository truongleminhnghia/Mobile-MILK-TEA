import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { appColor } from '@/constants/appColor.constant';
import CardRecipeComponent from '@/components/cards/CardRecipeComponent';

const Recipe = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('Liên quan');

  const filterOptions = [
    'Liên quan',
    'Mới nhất',
    'Trà sữa',
    'Milo',
    'Đặc biệt'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = require('../../services/stores/recipes.json');
        setRecipes(data);
      } catch (error) {
        console.error('Error loading recipes:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterOptions.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recipe Grid */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipeGrid}
      >
        {recipes.map((recipe, index) => (
          <View key={index} style={styles.cardWrapper}>
            <CardRecipeComponent recipe={recipe} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.WHITE,
  },
  filterContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: appColor.GRAY3,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: appColor.GRAY3,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: appColor.BG_PRIMARY,
  },
  filterText: {
    color: appColor.TEXT,
    fontSize: 14,
    fontFamily: 'outfit',
  },
  filterTextActive: {
    color: appColor.WHITE,
    fontFamily: 'outfit-medium',
  },
  recipeGrid: {
    padding: 16,
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});

export default Recipe;