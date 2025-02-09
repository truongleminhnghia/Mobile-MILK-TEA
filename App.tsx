import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  // đối tới ts không cần xác định type, ts nó sẽ tự động đoán type tương tự vả bên java
  // nếu muốn ép kiểu thì sau useState<string>("")
  const [count, setCount] = useState<number>(0);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60, fontWeight: "600" }}>Count = {count}</Text>
      <View>
        <Button title="InCrease" onPress={() => setCount(count + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
