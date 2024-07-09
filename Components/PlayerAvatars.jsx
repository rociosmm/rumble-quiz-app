import { View, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { socket } from "../socket";

export default function PlayerAvatars() {
  const [initialavatars_urls, setInitialAvatars_urls] = useState([]);

  socket.on("avatars", (avatars) => {
    console.log("avatars  players avatars :>> ", avatars);
    setInitialAvatars_urls(Object.values(avatars));
    console.log("avatars_urls :>> ", avatars_urls);
  });

  const styles = StyleSheet.create({
    avatars: {
      backgroundColor: "#FFE4C6",
      borderRadius: 50,
      width: 50,
      height: 50,
      borderColor: "white",
      borderWidth: 2,
    },
    avatars_container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.avatars_container}>
      {initialAvatars_urls.length > 0
        ? initialAvatars_urls.map((avatarUrl, index) => {
            return (
              <Image
                key={index}
                source={{ uri: avatarUrl }}
                style={styles.avatars}
              />
            );
          })
        : null}
    </View>
  );
}
