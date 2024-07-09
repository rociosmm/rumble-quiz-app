import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Topics from "./Topics";
import MyAccount from "./MyAccount";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { withTheme } from "react-native-paper";

function QuizContainer({ theme }) {
  const { colors } = theme;
  const [userLogged, setUserLogged] = useState("");
  const navigation = useNavigation();
  const getLogged = async () => {
    const user = await AsyncStorage.getItem("userLogged");
    return user;
  };

  useEffect(() => {
    setUserLogged(getLogged());
  }, []);

  // Styles are defined inside of the component to have access to the theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surfaceVariant,
    },
    h2: {
      textAlign: "center",
      fontSize: 30,
      marginVertical: 20,
      color: colors.secondary,
    },
  });
  return (
    <ImageBackground
      source={require("../assets/jigsaw_puzzle_frame_6_a_white.jpg")}
      style={styles.container}>
      <View>
        <Topics userLogged={userLogged} setUserLogged={setUserLogged} />
      </View>
    </ImageBackground>
  );
}

export default withTheme(QuizContainer);
