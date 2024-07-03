import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Topics from "./Topics";

export default function QuizContainer() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>QuizContainer</Text>
        <Topics />
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
