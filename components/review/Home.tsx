import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import React, { useState } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";


interface IReview {
  id: number;
  title: string;
  stars: number;
}

const Home = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [reviews, setReviews] = useState<IReview[]>([
    {
      id: 1,
      title: "React Native",
      stars: 5,
    },
    {
      id: 2,
      title: "Menu 1",
      stars: 4,
    },
    {
      id: 3,
      title: "Menu 3",
      stars: 3,
    },
  ]);

  return (
    <View>
      <Text style={{ fontSize: 30 }}>Review List: </Text>
      <View>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()} // Ensures key is a string
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("detail", item)}
              >
                <View style={{ padding: 10, borderBottomWidth: 1 }}>
                  <Text style={{ fontSize: 20 }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;
