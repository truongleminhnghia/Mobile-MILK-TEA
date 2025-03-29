import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { appColor } from "@/constants/appColor.constant";
import CardIngredientComponent from "@/components/cards/CardIngredientComponent";
import { useRouter } from "expo-router";

const Home = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = require("../../services/stores/ingredient.json");
        setIngredients(data.slice(0, 4)); // Lấy 4 phần tử đầu
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const viewMoreIngredient = () => {
    router.push("/(tabs)/Ingredient");
  };

  const renderItem = ({ item }: { item: any }) => (
    <CardIngredientComponent ingredient={item} />
  );

  return (
    <FlatList
      data={[{ id: "header" }]} // Tạo một item giả để hiển thị phần tiêu đề
      keyExtractor={(item) => item.id}
      renderItem={() => (
        <View
          style={{
            paddingLeft: 12,
            paddingRight: 12,
            backgroundColor: appColor.WHITE,
            height: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 35,
                color: appColor.BG_PRIMARY,
              }}
            >
              Babo station
            </Text>
            <Ionicons name="cart" size={30} color={appColor.TEXT} />
          </View>

          <Text
            style={{
              fontSize: 24,
              fontFamily: "outfit-medium",
              marginTop: 20,
            }}
          >
            Nguyên liệu nổi bật
          </Text>

          <FlatList
            data={ingredients}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.cardContainer}
          />
          <TouchableOpacity
            onPress={viewMoreIngredient}
            style={{
              width: 100,
              borderRadius: 20,
              padding: 6,
              backgroundColor: appColor.GRAY3,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: appColor.BG_PRIMARY,
              }}
            >
              Xem thêm
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 24,
              fontFamily: "outfit-medium",
              marginTop: 20,
            }}
          >
            Nguyên liệu nổi bật
          </Text>

          <FlatList
            data={ingredients}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.cardContainer}
          />
          <TouchableOpacity
            onPress={viewMoreIngredient}
            style={{
              width: 100,
              borderRadius: 20,
              padding: 6,
              backgroundColor: appColor.GRAY3,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: appColor.BG_PRIMARY,
              }}
            >
              Xem thêm
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    backgroundColor: appColor.WHITE,
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    color: appColor.BG_PRIMARY,
  },
  cardContainer: {
    marginTop: 20,
  },
  row: {
    justifyContent: "space-between", // Space between each card in a row
  },
});
