import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Topics from "./Topics";
import MyAccount from "./MyAccount";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuizContainer() {
  const [userLogged, setUserLogged] = useState("");
  const navigation = useNavigation();
  const getLogged = async () => {
    const user = await AsyncStorage.getItem("userLogged");
    return user;
  };

  useEffect(() => {
    setUserLogged(getLogged());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>QuizContainer - {userLogged}</Text>
        <Button
          title="Go to Account"
          onPress={() => navigation.navigate("My Account")}
        />
        <Topics />
        <Text>Hola desde QuizContainer</Text>
        <MyAccount />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
  },
});
