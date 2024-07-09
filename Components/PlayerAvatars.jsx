import { View, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { socket } from "../socket";

export default function PlayerAvatars() {
  const [avatars_urls, setAvatars_urls] = useState([]);

  socket.on("avatars", (avatars) => {
    console.log("avatars  players avatars :>> ", avatars);
    setAvatars_urls(Object.values(avatars));
    console.log("avatars_urls :>> ", avatars_urls);
  });
  
  return (
    <View>
      {avatars_urls.length > 0
        ? avatars_urls.map((avatarUrl, index) => {
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
const styles = StyleSheet.create({
  avatars: {
    backgroundColor: "red",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
