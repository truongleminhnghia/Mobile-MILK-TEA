import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  useFonts({
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-semiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
  });

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
