import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./components/review/Home";
import Detail from "./components/review/Detail";

// Drawer
import "react-native-gesture-handler";

import About from "./components/review/About";
import AppNavigation from "./components/navigation/app.navigation";
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
