import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LaunchPage from "./Components/LaunchPage";
import MyAccount from "./Components/MyAccount";
import AppNavigation from "./navigation/AppNavigation";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userLogged, setUserLogged] = useState("");

  if (userLogged !== "") {
    return (
      <NavigationContainer>
        <AppNavigation />
        {/* <Stack.Navigator>
        <Stack.Screen
          name="Launch Page"
          component={LaunchPage}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="My Account" component={MyAccount} />
      </Stack.Navigator> */}
      </NavigationContainer>
    );
  } else {
    return <LaunchPage />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
