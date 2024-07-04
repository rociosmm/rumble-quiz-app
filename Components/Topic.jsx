import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Topic({ topic }) {
  // console.log("topic :>> ", topic);
  return (
    <View style={styles.topicCard}>
      <Text style={styles.topicText}>{topic.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topicCard: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#ff8c00",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    width: "90%",
    alignSelf: "center",
  },
  topicText: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 25,
    alignSelf: "center",
  },
});
