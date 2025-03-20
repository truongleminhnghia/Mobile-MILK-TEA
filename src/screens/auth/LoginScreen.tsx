import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  TextComponent,
} from "../../components";
import { globalStyle } from "../../styles/globalStyle.style";
import { appColor } from "../../constants/appColor.contant";
import { Lock, Sms } from "iconsax-react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <ContainerComponent isIamgeBackground>
      <TextComponent text="hihi" flex={0} />
      {/* <InputComponent
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
      /> */}
    </ContainerComponent>
  );
};

export default LoginScreen;
