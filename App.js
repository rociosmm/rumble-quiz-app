import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PaperProvider, useTheme, DefaultTheme } from "react-native-paper";

// components
import Header from "./Components/Header";
import LoginPage from "./Components/LoginPage";
import CreateAccountPage from "./Components/CreateAccountPage";
import MyAccount from "./Components/MyAccount";
import Friends from "./Components/Friends";
import NotificationsList from "./Components/NotificationsList";
import QuizContainer from "./Components/QuizContainer";
import LeaderBoard from "./Components/LeaderBoardPage";
import QuizPage from "./Components/QuizPage";

// Navigation
import AppNavigation from "./navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Context and storage
import { UserContext } from "./context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorsDark, colorsLight } from "./Styles/ThemeColors";
import { useColorScheme, Appearance } from "react-native";

const Stack = createNativeStackNavigator();

/* const themeDark = {
  ...DefaultTheme,
  colors: colorsDark.colors,
}; */

//console.log("themeDf.colors :>> ", Object.keys(themeLight.colors));

export default function App() {
  const [userLogged, setUserLogged] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colorScheme = useColorScheme();
  const [currentScheme, setCurrentScheme] = useState(colorScheme);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // console.log("colorScheme :>> ", colorScheme);
      setCurrentScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);
  console.log("currentScheme app :>> ", currentScheme);
  const paperTheme =
    currentScheme === "dark"
      ? { ...DefaultTheme, colors: colorsDark }
      : { ...DefaultTheme, colors: colorsLight };

  const getDataFromStorage = async () => {
    const logged = await AsyncStorage.getItem("isLoggedIn");
    const user = await AsyncStorage.getItem("userLogged");
    const user_avatar = await AsyncStorage.getItem("avatar_url");

    console.log("logged :>> ", logged);
    if (logged) {
      setIsLoggedIn(true);
      setUserLogged(user);
      // console.log("isLoggedIn if inside:>> ", isLoggedIn);
      // console.log("userLogged inside getDataFromStorage :>> ", user);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  //console.log("isLoggedIn :>> ", isLoggedIn);

  const AfterLogin = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="AppNavigation">
        {(props) => (
          <AppNavigation
            {...props}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="QuizPage" component={QuizPage} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="LeaderBoard">
        {(props) => (
          <LeaderBoard
            {...props}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Notifications" component={NotificationsList} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
      <Stack.Screen name="LogIn">
        {(props) => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

  const BeforeLogin = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="LogIn">
        {(props) => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
      {/*  <Stack.Screen name="MyAccount" component={MyAccount} /> */}
    </Stack.Navigator>
  );

  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={styles.root}>
          <PaperProvider theme={paperTheme}>
            {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
          </PaperProvider>
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
