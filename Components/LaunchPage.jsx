import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import React from "react";
const Stack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAccount from "./MyAccount";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

export default function LaunchPage({ navigation }) {
  return (
    <View>
      <Login />

      <CreateAccount />
    </View>
  );
}

const AccountScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};
