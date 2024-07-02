import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import CheckBox from "expo-checkbox";

export default function CreateAccount() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [currentEmail, setCurrentEmail] = useState("");
  const [selected, setSelected] = useState(false);
  const [errorData, setErrorData] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkEmail = (e) => {
    console.log(e);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(e) === false) {
      console.log("Email is not correct");
      setCurrentEmail(e);
      setErrorData("Email is not correct");
    } else {
      setCurrentEmail(e);
      console.log("Email is Correct");
      setErrorData("");
    }
  };

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
      <TextInput
        style={styles.input}
        onChangeText={checkEmail}
        value={currentEmail}
        placeholder="Type your email"
      />
      {errorData ? <Text>{errorData}</Text> : null}
      <Text aria-label="Label for Username" nativeID="labelUsername">
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

      <View style={styles.checkbox}>
        <CheckBox
          value={selected}
          disabled={false}
          onValueChange={setSelected}
          style={styles.checkbox}
        />
        <Text aria-label="Label for Username" nativeID="labelUsername">
          &nbsp; Are you over 18?
        </Text>
      </View>
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
  checkbox: { display: "inline-flex", flexDirection: "row" },
});
