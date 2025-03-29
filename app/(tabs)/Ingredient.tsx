import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { appColor } from "@/constants/appColor.constant";
import ingredientData from "@/services/stores/ingredient.json";
import CardIngredientComponent from "@/components/cards/CardIngredientComponent";

const { width } = Dimensions.get('window');
const numColumns = 2;
const PADDING = 16;
const GAP = 12;
const CARD_WIDTH = (width - (PADDING * 2) - GAP) / numColumns;

interface FilterOption {
  id: string;
  label: string;
}

const filterOptions: FilterOption[] = [
  { id: 'related', label: 'Liên quan' },
  { id: 'newest', label: 'Mới nhất' },
  { id: 'type', label: 'Loại' },
];

const Ingredient = () => {
  const [selectedFilter, setSelectedFilter] = useState('related');
  const [ingredients, setIngredients] = useState(ingredientData);

  const renderFilterItem = ({ item }: { item: FilterOption }) => (
    <TouchableOpacity 
      style={[
        styles.filterButton,
        selectedFilter === item.id && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFilter(item.id)}
    >
      <Text style={[
        styles.filterText,
        selectedFilter === item.id && styles.filterTextActive
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderIngredientItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.cardWrapper}>
      <CardIngredientComponent ingredient={item} />
    </TouchableOpacity>
  );

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
    shadowColor: '#000',
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
    fontWeight: '500',
  },
  filterTextActive: {
    color: appColor.WHITE,
    fontWeight: '600',
  },
  gridContainer: {
    padding: PADDING,
  },
  columnWrapper: {
    gap: GAP,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    backgroundColor: appColor.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default Ingredient;
