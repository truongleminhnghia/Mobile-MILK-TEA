import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginScreen, OnbroadingScreen } from "../screens";

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false 
        }}>
      <Stack.Screen name="OnbroadingScreen" component={OnbroadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
