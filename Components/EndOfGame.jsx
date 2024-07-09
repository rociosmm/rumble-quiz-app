import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function EndOfGame({ result }) {
  return (
    <ImageBackground
      source={require("../assets/jigsaw_puzzle_frame_6_a_white.jpg")}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}></Text>
          {result === "win" ? "You Win!" : "You Lose!"}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: result === "win" ? "green" : "red",
  },
});
