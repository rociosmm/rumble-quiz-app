import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";

export default function Login() {
  const [currentUsername, setCurrentUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = () => {
    alert("config login");
  };

  return (
    <View>
      <Text style={styles.h2}>Login</Text>
      <Text aria-label="Label for Username" nativeID="labelUsername">
        Username
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setCurrentUsername}
        value={currentUsername}
        placeholder="Type your username"
      />
      <Text aria-label="Label for Password" nativeID="labelPassword">
        Password
      </Text>
      <View style={styles.password}>
        <TextInput
          style={styles.input}
          onChangeText={setCurrentPassword}
          value={currentPassword}
          placeholder="Type your password"
          secureTextEntry={!showPassword}
        />
        <Icon
          name={!showPassword ? "eye-off" : "eye"}
          size={20}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View>
      <Button title="Login" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    border: "1px solid grey",
    padding: "4px",
  },
  password: {
  },
  icon: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
