import { View, Text } from "react-native";
import React from "react";
import { ButtonComponent } from "../../components";
import { globalStyle } from "../../styles/globalStyle.style";

const LoginScreen = () => {
  return (
    <View style={[globalStyle.container, { padding: 16 }]}>
      <Text>LoginScreen</Text>
      <ButtonComponent
        type="primary"
        text="LOGIN"
        onPress={() => console.log("login")}
        icon={
          <View>
            <Text>N</Text>
          </View>
        }
      />
    </View>
  );
};

export default LoginScreen;
