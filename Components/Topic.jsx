import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Topic({ topic }) {
  console.log("topic :>> ", topic);
  return (
    <View style={styles.topicCard}>
      <Text style={styles.topicText}>{topic.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topicCard: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#f9c2ff",
    borderRadius: 8,
  },
  topicText: {
    fontSize: 16,
  },
});
