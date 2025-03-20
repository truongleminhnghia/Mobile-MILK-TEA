import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TextInputProps,
  KeyboardType,
} from "react-native";
import React, { ReactNode, useState } from "react";
import { EyeSlash } from "iconsax-react-native";
import { appColor } from "../constants/appColor.contant";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { globalStyle } from "../styles/globalStyle.style";

interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    isPassword,
    placeholder,
    suffix,
    allowClear,
    type
  } = props;

  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);

  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}
      <TextInput
        style={[styles.input, globalStyle.text]}
        value={value}
        placeholder={placeholder ?? ""}
        onChangeText={(val) => onChange(val)}
        secureTextEntry={isShowPassword}
        placeholderTextColor={"#747688"}
        keyboardType={type ?? 'default'}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword
            ? () => setIsShowPassword(!isShowPassword)
            : () => onChange("")
        }
      >
        {isPassword ? (
          <FontAwesome name={isShowPassword ? 'eye-slash' : 'eye'} size={22} color={appColor.gray1} />
        ) : (
          value.length > 0 && allowClear && (
            <AntDesign name="close" size={22} color={appColor.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColor.gray4,
    width: "100%",
    minHeight: 56,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: appColor.white,
    marginBottom: 20
  },
  input: {
    padding: 0,
    margin: 0,
    flex:1,
    paddingHorizontal: 14
  },
});
