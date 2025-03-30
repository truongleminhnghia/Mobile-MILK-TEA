import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { appColor } from "../../constants/appColor.constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/FireBaseConfig";
import { useDispatch } from "react-redux";
import authenticationAPI from "../../apis/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addAuth } from "../../redux/reducers/authReducer";

const SignIn = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      setLoading(true);
      
      // Validate inputs
      if (!email || !password) {
        setErrorMessage("Vui lòng nhập đầy đủ email và mật khẩu");
        return;
      }

      if (!validateEmail(email)) {
        setEmailError("Email không hợp lệ");
        return;
      }
      
      const data = {
        email: email,
        password: password,
      };
      
      const res = await authenticationAPI.HandleAuthentication(
        "login?typeLogin=LOGIN_LOCAL",
        data,
        "post"
      );
      
      if (res?.data) {
        console.log("Login response:", res.data);
        
        // Save token to AsyncStorage
        await AsyncStorage.setItem("accessToken", res.data.token);
        
        // Update Redux state
        dispatch(
          addAuth({
            accountResponse: res.data.accountResponse,
            token: res.data.token || "",
          })
        );

        setSuccessMessage("Đăng nhập thành công!");
        
        // Navigate to Home screen
        router.replace("/(tabs)/Home");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle specific error cases
      if (error?.response?.status === 503) {
        setErrorMessage("Máy chủ đang khởi động, vui lòng thử lại sau 30 giây");
      } else if (error?.response?.status === 401) {
        setErrorMessage("Email hoặc mật khẩu không chính xác");
      } else if (!navigator.onLine) {
        setErrorMessage("Không có kết nối mạng. Vui lòng kiểm tra và thử lại");
      } else {
        setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Let's Sign You In</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
            setErrorMessage("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage("");
          }}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={appColor.WHITE} />
        ) : (
          <Text style={styles.buttonText}>Đăng nhập</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpTextContainer}>
        <Text style={styles.signUpText}>
          Chưa có tài khoản?{" "}
          <Text onPress={() => router.push("/auths/SignUp")} style={{ color: appColor.BG_PRIMARY }}>
            Đăng ký ngay
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
  buttonDisabled: {
    opacity: 0.7,
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
    fontFamily: "outfit-regular",
  },
  successText: {
    color: "green",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: "outfit-regular",
  },
});

export default SignIn;
