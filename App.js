import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
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

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {/* Before login 
     <Stack.Screen
       name="Launch Page"
       component={LaunchPage}
       options={{ title: "Welcome" }}
     />*/}
      <Stack.Screen name="QuizContainer" component={QuizContainer} />
      <Stack.Screen name="My Account" component={MyAccount} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="Notifications" component={NotificationsList} />
    </Stack.Navigator>
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

    if (logged) {
      setIsLoggedIn(true);
      setUserLogged(user);
      console.log("userLogged inside getDataFromStorage :>> ", user);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  console.log("userLogged app:>> ", userLogged);
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
