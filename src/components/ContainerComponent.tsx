import { View, Text, ImageBackground, ScrollView } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyle } from "../styles/globalStyle.style";

interface Props {
    isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
}

const ContainerComponent = (props: Props) => {
  const { children, isImageBackground, isScroll, title } = props;
  const returnContainer = isScroll ? (
    <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require("../assets/images/splash-img.png")}
      style={{ flex: 1 }}
      imageStyle={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>{returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyle.container]}>
      <View>{returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
