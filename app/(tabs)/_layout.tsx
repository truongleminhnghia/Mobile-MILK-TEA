import { Tabs } from "expo-router";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { appColor } from "@/constants/appColor.constant";
import Header from "@/components/shared/Header";

export default function TabLayout() {
  const getTabScreenOptions = (showBack = true) => ({
    header: () => (
      <Header 
        showBack={showBack}
        showMenu={true}
        onSearch={(text) => console.log('Searching:', text)}
      />
    ),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: appColor.BG_PRIMARY,
        tabBarInactiveTintColor: appColor.GRAY1,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-sharp" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Ingredient"
        options={{
          tabBarLabel: "Nguyên liệu",
          tabBarIcon: ({ color }) => (
            <Ionicons name="storefront-outline" size={24} color={color} />
          ),
          ...getTabScreenOptions(),
        }}
      />
      <Tabs.Screen
        name="Recipe"
        options={{
          tabBarLabel: "Công thức",
          tabBarIcon: ({ color }) => (
            <Ionicons name="restaurant-outline" size={24} color={color} />
          ),
          ...getTabScreenOptions(),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
          ...getTabScreenOptions(),
        }}
      />
    </Tabs>
  );
}
