import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
const Stack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAccount from "./MyAccount";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

export default function LaunchPage({ navigation, setUserLogged }) {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Login />

        <CreateAccount />

        <Button
          title="Continue as guest"
          onPress={() =>
            setUserLogged({
              username: "guest",
              isChild: false,
            })
          }
        />
        <Button
          title="Continue as kids guest"
          onPress={() =>
            setUserLogged({
              username: "kidsGuest",
              isChild: true,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const AccountScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
