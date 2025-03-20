import { View, Text, Image, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { globalStyle } from "../../styles/globalStyle.style";
import { appColor } from "../../constants/appColor.contant";
import { Lock, Sms } from "iconsax-react-native";
import { fontFamilies } from "../../constants/fontFamilies.constant";
import SocialLogin from "./components/SocialLogin";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(true);
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 75,
        }}
      >
        <Image
          source={require("../../assets/images/text-logo.png")}
          style={{ width: 162, height: 114, marginBottom: 30 }}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent
          styles={[style.heading]}
          title
          text="Sign in"
          size={24}
        />
        <SpaceComponent height={22} />
        <InputComponent
          value={email}
          onChange={(val) => setEmail(val)}
          placeholder="Nhập email"
          // isPassword
          allowClear
          affix={<Sms size={22} color={appColor.primary} />}
        />
        <InputComponent
          value={password}
          onChange={(val) => setPassword(val)}
          placeholder="Nhập mật khẩu"
          isPassword
          allowClear
          affix={<Lock size={22} color={appColor.primary} />}
        />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColor.primary }}
              thumbColor={appColor.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Remeber me" />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password"
            onPress={() => {}}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent text="SIGN IN" type="primary" />
      </SectionComponent>
      <SectionComponent>
        <SocialLogin />
        <RowComponent justify="center">
          <TextComponent text="Don't have an account? " />
          <ButtonComponent type="link" text="sign up" />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  heading: {
    fontFamily: "AirbnbCereal_W_XBd",
  },
});
