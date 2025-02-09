import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  // đối tới ts không cần xác định type, ts nó sẽ tự động đoán type tương tự vả bên java
  // nếu muốn ép kiểu thì sau useState<string>("")
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 50, fontWeight: "600" }}>Name: {name}</Text>
        <TextInput
          // multiline giống như textarea
          multiline
          onChangeText={(value) => setName(value)}
          style={{
            borderColor: "green",
            borderWidth: 1,
            width: 200,
            padding: 15,
          }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 50, fontWeight: "600" }}>Tuổi: {age}</Text>
        <TextInput
          // multiline giống như textarea
          multiline
          onChangeText={(value) => setAge(value)}
          style={{
            borderColor: "green",
            borderWidth: 1,
            width: 200,
            padding: 15,
          }}
        />
      </View>
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
