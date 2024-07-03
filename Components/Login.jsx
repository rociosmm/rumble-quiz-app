import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [currentUsername, setCurrentUsername] = useState("eve.holt@reqres.in");

  const [currentPassword, setCurrentPassword] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  /*   const { userLogged, setUserLogged } = useContext(UserContext); */
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("userLogged", currentUsername);
    } catch (error) {
      // Error saving data
      throw error;
    }
  };

  const login = () => {
    console.log(
      "currentUsername, currentPassword => ",
      currentUsername,
      currentPassword
    );
    const userData = {
      username: currentUsername,
      password: currentPassword,
    };

    // do the real axios request here
    axios.post("https://reqres.in/api/login", userData).then(async (res) => {
      console.log("res.data :>> ", res.data); // token from reqres api
      if (res.data.status === "200") {
        try {
          await AsyncStorage.setItem("token", res.data);
          await AsyncStorage.setItem("userLogged", userData.username);
          await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          //navigation.navigate("QuizContainer");
        } catch (error) {
          console.log("error in post request for login ", error);
        }
      }
    });

    //alert("config login");
    navigation.navigate("Play");
    storeData();
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
  password: {},
  icon: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
