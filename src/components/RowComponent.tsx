import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode } from "react";
import { globalStyle } from "../styles/globalStyle.style";

interface Props {
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  styles?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: () => void;
}

const RowComponent = (props: Props) => {
  const { children, justify, styles, onPress } = props;
  const style = [
    globalStyle.row,
    {
      justifyContent: justify,
    },
    styles,
  ];
  return onPress ? (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={style}>{children}</TouchableOpacity>
  ) : (
    <View style={style}>{children}</View>
  );
};

export default RowComponent;
