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
import authenticationAPI from "../../apis/auth.api";

// Định nghĩa kiểu cho các state
interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  loading: boolean;
  errorMessage: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // State với kiểu dữ liệu đã định nghĩa
  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    loading: false,
    errorMessage: "",
  });

  // Hàm kiểm tra email hợp lệ
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Hàm kiểm tra mật khẩu hợp lệ
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    try {
      let isValid = true;
      setState(prev => ({ ...prev, loading: true, errorMessage: "" }));

      // Validate firstName
      if (!state.firstName.trim()) {
        setState(prev => ({ ...prev, firstNameError: "Vui lòng nhập tên" }));
        isValid = false;
      }

      // Validate lastName
      if (!state.lastName.trim()) {
        setState(prev => ({ ...prev, lastNameError: "Vui lòng nhập họ" }));
        isValid = false;
      }

      // Validate email
      if (!validateEmail(state.email)) {
        setState(prev => ({ ...prev, emailError: "Email không hợp lệ" }));
        isValid = false;
      }

      // Validate password
      if (!validatePassword(state.password)) {
        setState(prev => ({ ...prev, passwordError: "Mật khẩu phải có ít nhất 6 ký tự" }));
        isValid = false;
      }

      // Validate confirm password
      if (state.password !== state.confirmPassword) {
        setState(prev => ({ ...prev, confirmPasswordError: "Mật khẩu xác nhận không khớp" }));
        isValid = false;
      }

      if (!isValid) {
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      // Call register API
      const response = await authenticationAPI.HandleAuthentication(
        "register",
        {
          email: state.email,
          password: state.password,
          firstName: state.firstName,
          lastName: state.lastName,
          roleName: "ROLE_CUSTOMER"
        },
        "post"
      );

      if (response?.data) {
        console.log("Register success:", response.data);
        // Navigate to SignIn page
        router.replace("/auths/SignIn");
      }
    } catch (error: any) {
      console.error("Register error:", error);
      if (error?.response?.status === 503) {
        setState(prev => ({ 
          ...prev, 
          errorMessage: "Máy chủ đang bảo trì, vui lòng thử lại sau" 
        }));
      } else if (error?.response?.status === 400) {
        setState(prev => ({ 
          ...prev, 
          errorMessage: "Email đã tồn tại trong hệ thống" 
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          errorMessage: "Đã có lỗi xảy ra, vui lòng thử lại sau" 
        }));
      }
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      {state.errorMessage ? (
        <Text style={styles.errorText}>{state.errorMessage}</Text>
      ) : null}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Họ</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ"
          value={state.lastName}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, lastName: text, lastNameError: "" }))
          }
        />
        {state.lastNameError ? (
          <Text style={styles.errorText}>{state.lastNameError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên"
          value={state.firstName}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, firstName: text, firstNameError: "" }))
          }
        />
        {state.firstNameError ? (
          <Text style={styles.errorText}>{state.firstNameError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          value={state.email}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, email: text, emailError: "" }))
          }
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {state.emailError ? (
          <Text style={styles.errorText}>{state.emailError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          value={state.password}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, password: text, passwordError: "" }))
          }
          secureTextEntry
        />
        {state.passwordError ? (
          <Text style={styles.errorText}>{state.passwordError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          value={state.confirmPassword}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, confirmPassword: text, confirmPasswordError: "" }))
          }
          secureTextEntry
        />
        {state.confirmPasswordError ? (
          <Text style={styles.errorText}>{state.confirmPasswordError}</Text>
        ) : null}
      </View>

      <TouchableOpacity 
        style={[styles.button, state.loading && styles.buttonDisabled]} 
        onPress={handleSignUp}
        disabled={state.loading}
      >
        {state.loading ? (
          <ActivityIndicator color={appColor.WHITE} />
        ) : (
          <Text style={styles.buttonText}>Đăng ký</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInTextContainer}>
        <Text style={styles.signInText}>
          Đã có tài khoản?{" "}
          <Text
            onPress={() => router.push("/auths/SignIn")}
            style={{ color: appColor.BG_PRIMARY }}
          >
            Đăng nhập ngay
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    backgroundColor: appColor.WHITE,
    height: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    color: appColor.TEXT,
  },
  subtitle: {
    fontFamily: "outfit-regular",
    color: appColor.GRAY2,
    marginTop: 10,
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 20,
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
  signInTextContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signInText: {
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
});

export default SignUp;
