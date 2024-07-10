import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CheckBox from "expo-checkbox";
import { SelectCountry } from "react-native-element-dropdown";

import { useNavigation } from "@react-navigation/native";
import { postNewUser } from "../utils/api";

export default function CreateAccountPage({ setIsLoggedIn, currentScheme, avatars }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordRepeatInput, setPasswordRepeatInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [selected, setSelected] = useState(false);
  const [currentSchemeNumber, setCurrentSchemeNumber] = useState(null);
  const [avatar, setAvatar] = useState([])

// console.log("Avatars in CreateAccount>>>", avatars)

  const navigation = useNavigation();

  useEffect(() => {
      if (currentScheme === "light") {
        setCurrentSchemeNumber(1);
      } else if (currentScheme === "dark") {
        setCurrentSchemeNumber(2);
      }
  }, [currentScheme])

  const onCreateAccountPressed = () => {
    const postBody = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
      avatar_id: 1,
      is_child: "false",
      colour_theme_id: currentSchemeNumber,
      online: true,
    };

//     postNewUser(postBody).then((newUser) => {
//         console.log(newUser)
//         navigation.navigate("AppNavigation")
//     }).catch((err) => {
//         console.log("error posting new user:", err)
//         // return error message
//     })
  };

  const onLogInPressed = () => {
    navigation.navigate("LogIn");
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.root}>
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
        <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        maxHeight={200}
        // value={avatar}
        data={avatars}
        valueField="avatar_id"
        labelField="avatar_name"
        imageField={{uri: "avatar_url"}}
        placeholder="Select Avatar"
        onChange={(item) => {
            const { _index, ...selectedAvatar } = item;
            setAvatar(selectedAvatar);
            console.log("Selected Avatar ID:", avatar);
        }}
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
  dropdown: {
    marginVertical: 20,
    height: 50,
    width: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
