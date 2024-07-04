import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

// components
import Header from "./Components/Header";
import LaunchPage from "./Components/LaunchPage";
import MyAccount from "./Components/MyAccount";
import Friends from "./Components/Friends";
import NotificationsList from "./Components/NotificationsList";
import QuizContainer from "./Components/QuizContainer";

import AppNavigation from "./navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "./context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const LoginNav = () => {
  /* const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuizContainer" component={QuizContainer} />
      <Stack.Screen name="My Account" component={MyAccount} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="Notifications" component={NotificationsList} />
    </Stack.Navigator>
  ); */

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Play") {
            iconName = focused ? "extension-puzzle" : "extension-puzzle-outline";
          } else if (route.name === "My Account") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Friends") {
            iconName = focused ? "people-sharp" : "people-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications-sharp" : "notifications-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "green",

        inactiveTintColor: "gray",
      }}
    >
      
      <Tab.Screen name="Play" component={QuizContainer} />
      <Tab.Screen name="My Account" component={MyAccount} />
      <Tab.Screen name="Friends" component={Friends} />
      <Tab.Screen name="Notifications" component={NotificationsList} />
    </Tab.Navigator>
  );
};

const BeforeLoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {/* Before login */}
      <Stack.Screen
        name="Launch Page"
        component={LaunchPage}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen name="LaunchPage" component={LaunchPage} />
      <Stack.Screen name="Play" component={QuizContainer} />
      <Stack.Screen name="My Account" component={MyAccount} />
    </Stack.Navigator>
  );
};
export default function App() {
  const [userLogged, setUserLogged] = useState("");
  //const { userLogged, setUserLogged } = useContext(UserContext);is
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getDataFromStorage = async () => {
    const logged = await AsyncStorage.getItem("isLoggedIn");
    const user = await AsyncStorage.getItem("userLogged");

    console.log("logged :>> ", logged);
    if (logged) {
      setIsLoggedIn(true);
      setUserLogged(user);
      console.log("isLoggedIn :>> ", isLoggedIn);
      console.log("userLogged inside getDataFromStorage :>> ", user);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <LoginNav /> : <BeforeLoginNav />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
