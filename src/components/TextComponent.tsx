import { View, Text, StyleProp, TextStyle } from "react-native";
import React from "react";
import { appColor } from "../constants/appColor.contant";
import { fontFamilies } from "../constants/fontFamilies.constant";
import { globalStyle } from "../styles/globalStyle.style";

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
}

const TextComponent = (props: Props) => {
  const { text, color, size, flex, font, styles, title } = props;
  return (
    <Text
      style={[
        globalStyle.text,
        {
          color: color ?? appColor.text,
          flex: flex ?? 0,
          fontSize: size ?? title ? 24 : 16,
          fontFamily: font ?? title ? fontFamilies.bold : fontFamilies.regular,
        },
        styles,
      ]}
    >
      {text}
    </Text>
  );
};

export default TextComponent;
