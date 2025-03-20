import { View, Text } from "react-native";
import React from "react";
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from "../../../components";
import { appColor } from "../../../constants/appColor.contant";
import { fontFamilies } from "../../../constants/fontFamilies.constant";
import { Google } from "iconsax-react-native";

const SocialLogin = () => {
  return (
    <SectionComponent>
      <TextComponent
        styles={{ textAlign: "center" }}
        text="OR"
        color={appColor.gray2}
        size={16}
        font={fontFamilies.medium}
      />
      <ButtonComponent
        type="primary"
        color={appColor.white}
        textColor={appColor.text}
        text="Google"
        icon={<Google size={24} color={appColor.primary} />}
        iconFlex="left"
      />
    </SectionComponent>
  );
};

export default SocialLogin;
