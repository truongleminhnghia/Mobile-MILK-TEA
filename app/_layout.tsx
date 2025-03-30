import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function RootLayout() {
  useFonts({
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-semiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
  });

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="index" /> */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>
  );
}
