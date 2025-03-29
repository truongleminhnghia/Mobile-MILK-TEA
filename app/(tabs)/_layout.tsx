import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { appColor } from "@/constants/appColor.constant";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: appColor.BG_PRIMARY,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Ingredient"
        options={{
          tabBarLabel: "Nguyên liệu",
          tabBarIcon: ({ color }) => (
            <Ionicons name="storefront-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Recipe"
        options={{
          tabBarLabel: "Công thức",
          tabBarIcon: ({ color }) => (
            <Ionicons name="storefront-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
