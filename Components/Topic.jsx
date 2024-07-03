import { View, Text } from "react-native";
import React from "react";

export default function Topic({ topic }) {
  console.log("topic :>> ", topic);
  return (
    <View>
      <Text>{topic.name}</Text>
    </View>
  );
}
