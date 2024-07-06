import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Leaderboard from "react-native-leaderboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LeaderBoard() {
  const [userLogged, setUserLogged] = useState("Nikki");

  const getUserLogged = async () => {
    const user = await AsyncStorage.getItem("userLogged");
    if (user) setUserLogged(user);
  };

  useEffect(() => {
    // getUserLogged();
  }, []);

  const playersPointData = [
    { player_username: "Joe", total_points: 52 },
    { player_username: "Jenny", total_points: 38 },
    { player_username: "Nikki", total_points: 2 },
  ];

  const myData = playersPointData.find(
    (ply) => ply.player_username === userLogged
  );

  const position = playersPointData.findIndex(
    (ply) => ply.player_username === userLogged
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.h2}>LeaderBoard</Text>
        <Text style={styles.subtitle}>
          My points: {myData.total_points}, position: {position + 1}
        </Text>
      </View>

      <Leaderboard
        data={playersPointData}
        sortBy="total_points"
        labelBy="player_username"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  h2: {
    fontSize: 30,
    textAlign: "center",
  },
  header: {
    backgroundColor: "#CCAE2F",
  },
  subtitle: {
    fontSize: 26,
    textAlign: "center",
  },
});
