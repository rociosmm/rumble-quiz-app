import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginNavigation from "./LoginNavigation";
import AppNavigation from "./AppNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator ({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {isLoggedIn ? (
      <Stack.Screen name="App">
        {props => <AppNavigation {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    ) : (
      <Stack.Screen name="Auth">
        {props => <LoginNavigation {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    )}
  </Stack.Navigator>
  );
};
