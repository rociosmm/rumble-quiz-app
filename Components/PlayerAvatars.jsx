import { View, Image, StyleSheet } from "react-native";
import React from "react";

export default function PlayerAvatars() {
  const avatarUrl =
    "https://github.com/nkytruong/rumble-quiz-app/blob/main/assets/avatars/icons8-bear-48.png?raw=true";
  return (
    <View>
      <Image source={{ uri: avatarUrl }} style={styles.avatars} />
    </View>
  );
}
const styles = StyleSheet.create({
  avatars: {
    backgroundColor: "red",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
