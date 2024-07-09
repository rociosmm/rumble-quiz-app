import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  // useWindowDimensions,
  // Image,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CheckBox from "expo-checkbox";

// import Logo from "../assets/Designer.jpeg";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccountPage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordRepeatInput, setPasswordRepeatInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [selected, setSelected] = useState(false);

  // const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onCreateAccountPressed = () => {
    console.warn("Create Account");
  };

  const onLogInPressed = () => {
    console.warn("Log in");
    navigation.navigate("LogIn");
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.root}>
        {/* <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        /> */}
        <Text style={styles.title}>Create an Account</Text>
        <CustomInput
          placeholder="Username"
          value={usernameInput}
          setValue={setUsernameInput}
        />
        <CustomInput
          placeholder="Email"
          value={emailInput}
          setValue={setEmailInput}
        />
        <CustomInput
          placeholder="Password"
          value={passwordInput}
          setValue={setPasswordInput}
          secureTextEntry={!showPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          type="Password"
        />
        <CustomInput
          placeholder="Repeat Password"
          value={passwordRepeatInput}
          setValue={setPasswordRepeatInput}
          secureTextEntry={!showRepeatPassword}
          showRepeatPassword={showRepeatPassword}
          setShowRepeatPassword={setShowRepeatPassword}
          type="RepeatPassword"
        />
        <View style={styles.checkbox}>
          <CheckBox
            value={selected}
            disabled={false}
            onValueChange={setSelected}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Are you over 15?</Text>
        </View>
        <CustomButton text="Create Account" onPress={onCreateAccountPressed} />
        <CustomButton
          text="Have an account? Log in"
          onPress={onLogInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
  },
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // width: "95%",
    // textAlign: "left",
    color: "#051C60",
    margin: 10,
  },
  checkbox: {
    display: "inline-flex",
    flexDirection: "row",
    margin: 10,
  },
  checkboxText: {
    margin: 12,
  },
});
