import Login from "@/components/Login";
import { auth } from "@/configs/FireBaseConfig";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const user = auth.currentUser;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href={'/ingredient'} /> : <Login />}
    </View>
  );
}
