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
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../configs/FireBaseConfig'

// Định nghĩa kiểu cho các state
interface State {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string; // Thêm trường xác nhận mật khẩu
  fullNameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string; // Thêm lỗi cho xác nhận mật khẩu
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
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "", // Thêm trường xác nhận mật khẩu
    fullNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "", // Thêm lỗi cho xác nhận mật khẩu
  });

  // Hàm kiểm tra email hợp lệ
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Hàm kiểm tra mật khẩu hợp lệ
  const validatePassword = (password: string): boolean => {
    return password.length >= 6; // Đảm bảo mật khẩu ít nhất 6 ký tự
  };

  const handleSignUp = () => {
    let isValid = true;

    // Kiểm tra tên đầy đủ
    if (!state.fullName) {
      setState((prevState) => ({
        ...prevState,
        fullNameError: "Họ tên không được để trống",
      }));
      isValid = false;
    } else {
      setState((prevState) => ({ ...prevState, fullNameError: "" }));
    }

    // Kiểm tra email
    if (!validateEmail(state.email)) {
      setState((prevState) => ({
        ...prevState,
        emailError: "Email không hợp lệ. Vui lòng nhập lại.",
      }));
      isValid = false;
    } else {
      setState((prevState) => ({ ...prevState, emailError: "" }));
    }

    // Kiểm tra mật khẩu
    if (!validatePassword(state.password)) {
      setState((prevState) => ({
        ...prevState,
        passwordError: "Mật khẩu phải ít nhất 6 ký tự.",
      }));
      isValid = false;
    } else {
      setState((prevState) => ({ ...prevState, passwordError: "" }));
    }

    // Kiểm tra xác nhận mật khẩu
    if (state.password !== state.confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        confirmPasswordError: "Mật khẩu xác nhận không khớp",
      }));
      isValid = false;
    } else {
      setState((prevState) => ({ ...prevState, confirmPasswordError: "" }));
    }

    // Nếu mọi thứ hợp lệ, xử lý đăng ký
    if (isValid) {
      console.log("Đăng ký thành công");
      // Logic đăng ký ở đây
      // Chuyển hướng về màn hình đăng nhập
      router.push("/auths/SignIn");
    }
  };

  const CreateAccount = () => {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);

        // ..
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Họ tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ tên"
          value={state.fullName}
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, fullName: text }))
          }
        />
        {state.fullNameError ? (
          <Text style={styles.errorText}>{state.fullNameError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          value={state.email}
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, email: text }))
          }
          keyboardType="email-address"
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
            setState((prevState) => ({ ...prevState, password: text }))
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
            setState((prevState) => ({ ...prevState, confirmPassword: text }))
          }
          secureTextEntry
        />
        {state.confirmPasswordError ? (
          <Text style={styles.errorText}>{state.confirmPasswordError}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={CreateAccount}>
        <Text style={styles.buttonText}>Đăng ký</Text>
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

export default SignUp;

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
  },
});
