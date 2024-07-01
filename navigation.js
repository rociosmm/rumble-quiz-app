import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LaunchPage from "./Components/LaunchPage";
import MyAccount from "./Components/MyAccount";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LaunchPage}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Profile" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
