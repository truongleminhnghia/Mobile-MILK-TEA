import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../review/Home";
import Detail from "../review/Detail";
import About from "../review/About";

const HomeLayout = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ title: "Trang chủ" }}
      />
      <Stack.Screen
        name="detail"
        component={Detail}
        options={{ title: "Chi Tiết" }}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen
          name="home1"
          component={HomeLayout}
          options={{ title: "Trang chủ" }}
        />
        <Drawer.Screen
          name="about"
          component={About}
          options={{ title: "Thông tin" }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default AppNavigation;
