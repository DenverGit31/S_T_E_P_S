import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import icon from "../../assets/science-report.png";
export default function LoginScreen() {
  const [text, setText] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Image
          source={icon}
          style={{ height: 80, width: 80, marginBottom: 10 }}
        />
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#0066ff" }}>
          S.T.E.P.S
        </Text>
        <Text style={{ fontSize: 11, fontWeight: "bold", color: "#0066ff" }}>
          Science and Technology Platform for Students
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: "#5c85d6",
          height: "100%",
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            marginLeft: 10,
            marginBottom: 20,
          }}
        >
          Sign in
        </Text>
        <View style={{ margin: 10 }}>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            Username
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username here.."
            placeholderTextColor="#fff"
            value={text}
            onChangeText={(input) => setText(input)}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password here.."
            placeholderTextColor="#fff"
            value={text}
            onChangeText={(input) => setText(input)}
          />
        </View>
        <TouchableOpacity style={{ marginTop: 20 }}>
          <Button mode="contained" textColor="#0066ff" buttonColor="white">
            Log in
          </Button>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 2 }}>
          <Button mode="text" textColor="white">
            Forgot Password
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "black",
  },
  input: {
    height: 40,
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  output: {
    marginTop: 10,
    fontSize: 18,
  },
});
