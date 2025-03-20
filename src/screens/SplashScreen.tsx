import React from "react";
import { ActivityIndicator, Image, ImageBackground } from "react-native";
import { appInfo } from "../constants/appInfos.constants";
import { SpaceComponent } from "../components";
import { appColor } from "../constants/appColor.contant";

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/splash-img.png")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      imageStyle={{ flex: 1 }}
    >
      <Image
        source={require("../assets/images/Logo-Boba-Station.png")}
        style={{
          width: appInfo.sizes.WIDTH * 0.7,
          resizeMode: "cover",
        }}
      />
      <SpaceComponent height={16} />
      <ActivityIndicator color={appColor.gray2} size={22} />
    </ImageBackground>
  );
};

export default SplashScreen;
