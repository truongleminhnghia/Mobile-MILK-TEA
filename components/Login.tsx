import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { appColor } from "@/constants/appColor.constant";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  return (
    <View>
      <Image
        source={require("../assets/images/banners/image.png")}
        style={{
          with: "100%",
          height: "550",
          objectFit: "cover",
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Wellcome to BaboStation
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 20,
            fontFamily: "outfit-regular",
            textAlign: "center",
            color: appColor.GRAY1,
          }}
        >
          Cung cấp dịch vụ hỗ trợ và tư vấn cho khách hàng về cách sử dụng
          nguyên liệu trà sữa, qua đó tạo niềm tin và tăng sự hài lòng của khách
          hàng.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auths/SignIn")}
        >
          <Text
            style={{
              color: appColor.WHITE,
              textAlign: "center",
              fontFamily: "outfit-bold",
              fontSize: 18,
            }}
          >
            Tiếp Theo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.WHITE,
    marginTop: -20,
    // flex: 1,
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  button: {
    padding: 15,
    backgroundColor: appColor.BG_PRIMARY,
    borderRadius: 99,
    marginTop: "20%",
  },
});
