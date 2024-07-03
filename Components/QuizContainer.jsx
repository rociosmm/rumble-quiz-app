import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Topics from "./Topics";
import MyAccount from "./MyAccount";

export default function QuizContainer() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>QuizContainer</Text>
        <Text>Hola desde QuizContainer</Text>
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
