import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import CheckBox from "@react-native-community/checkbox";

export default function CreateAccount() {
  const [currentUsername, setCurrentUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState([]);
  const [showPassword, setShowPassword] = useState(true);
  const [pass, setPass] = useState("");
  const [selected, setSelected] = useState(false);

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

  const register = () => {
    alert("config register");
  };
  return (
    <View>
      <Text>CreateAccount</Text>
      <Text aria-label="Label for Username" nativeID="labelUsername">
        Username
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setCurrentUsername}
        value={currentUsername}
        placeholder="Type your username"
      />
      <Text aria-label="Label for Username" nativeID="labelUsername">
        Email
      </Text>
      <Text aria-label="Label for Username" nativeID="labelUsername">
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

      <Text aria-label="Label for Username" nativeID="labelUsername">
        Are you over 18?
      </Text>
      <CheckBox
        value={selected}
        disabled={false}
        onValueChange={setSelected}
        style={styles.checkbox}
      />
      <Button title="Button" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    border: "1px solid grey",
    padding: "4px",
  },
  password: {},
  checkbox: {},
});
