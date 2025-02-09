import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Nghĩa TLMN</Text>
      </View>
      <Text style={{ color: "red", fontSize: 60 }}>Hello world 1</Text>
      <Text>Hello world 2</Text>
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
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});
