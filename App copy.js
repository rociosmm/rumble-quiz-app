import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Components/Login";
import LoginPage from "./Components/LoginPage";
import CreateAccountPage from "./Components/CreateAccountPage";
import LoginNavigation from "./navigation/LoginNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigation from "./navigation/AppNavigation";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    console.log(data, "is user logged in");
    setIsLoggedIn(data === 'true');
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
    <SafeAreaView style={styles.root}>
        {/* {isLoggedIn ? <AppNavigation/> : <LoginNavigation/> } */}
        <RootNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: 'white',
  },
});
