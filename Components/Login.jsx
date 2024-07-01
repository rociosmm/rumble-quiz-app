import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";

export default function Login() {
  const [currentUsername, setCurrentUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState([]);
  const [showPassword, setShowPassword] = useState(true);
  const [pass, setPass] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (e) => {
    setCurrentPassword((current) => [...current, e.slice(-1)]);
    setPass(e);
  };

  useEffect(() => {
    if (!showPassword) {
      setPass((currentPassword) => {
        return "*".repeat(currentPassword.length);
      });
    } else {
      setPass(currentPassword.join(""));
    }
  }, [showPassword, currentPassword]);

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
          onChangeText={handlePassword}
          value={pass}
          placeholder="Type your password"
        />
        <Icon
          name={!showPassword ? "eye-off" : "eye"}
          size={20}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View>
      <Button title="Button" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    border: "1px solid grey",
    padding: "4px",
  },
  password: {},
});
