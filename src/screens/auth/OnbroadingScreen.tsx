import { View, Text, Image, Touchable, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { globalStyle } from "../../styles/globalStyle.style";
import Swiper from "react-native-swiper";
import { appInfo } from "../../constants/appInfos.constants";
import { appColor } from "../../constants/appColor.contant";
import { TextComponent } from "../../components";
import { fontFamilies } from "../../constants/fontFamilies.constant";

const OnbroadingScreen = ({ navigation }: any) => {
  const [index, setIndex] = useState(0);
  return (
    <View style={[globalStyle.container]}>
      <Swiper
        style={{}}
        loop={false}
        onIndexChanged={(num) => setIndex(num)}
        activeDotColor={appColor.white}
        dotColor={appColor.gray4}
        index={index}
      >
        <Image
          source={require("../../assets/images/onboarding1.png")}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: "cover",
          }}
        />
        <Image
          source={require("../../assets/images/onboarding2.png")}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: "cover",
          }}
        />
      </Swiper>
      <View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 12,
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <TextComponent text="Skip" color={appColor.gray2} font={fontFamilies.medium}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 1 ? setIndex(index + 1) : navigation.navigate("LoginScreen")
          }
        >
          <TextComponent text="Next" color={appColor.gray1}  />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnbroadingScreen;

const styles = StyleSheet.create({
    text: {
        color: appColor.gray2,
        fontSize: 18,
        fontWeight: '500',
    }
});
