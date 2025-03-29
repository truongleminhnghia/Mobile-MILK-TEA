import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { appColor } from "@/constants/appColor.constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/FireBaseConfig";

const SignIn = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); 

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSignIn = () => {
    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ. Vui lòng nhập lại.");
      return;
    }
    setEmailError("");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const goToSignUp = () => {
    router.push("/auths/SignUp");
  };

  const onSigin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/Home')
        console.log("user", user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode)
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Let's Sign You In</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSigin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpTextContainer}>
        <Text style={styles.signUpText}>
          Chưa có tài khoản?{" "}
          <Text onPress={goToSignUp} style={{ color: appColor.BG_PRIMARY }}>
            Đăng ký ngay
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 80,
    backgroundColor: appColor.WHITE,
    height: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    color: appColor.TEXT,
    marginTop: 30,
  },
  subtitle: {
    fontFamily: "outfit-regular",
    color: appColor.GRAY2,
    marginTop: 10,
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 30,
  },
  label: {
    fontFamily: "outfit-regular",
    marginBottom: 12,
    fontSize: 16,
    color: appColor.GRAY1,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: appColor.GRAY2,
    fontSize: 16,
    color: appColor.GRAY1,
  },
  button: {
    backgroundColor: appColor.BG_PRIMARY,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 40,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "outfit-bold",
    color: appColor.WHITE,
    fontSize: 18,
  },
  signUpTextContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signUpText: {
    fontFamily: "outfit-regular",
    color: appColor.GRAY2,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});
