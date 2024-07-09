import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Leaderboard from "react-native-leaderboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsersPoints } from "../utils/api";

export default function LeaderBoard() {
  const [userLogged, setUserLogged] = useState("");
  const [usersPoints, setUsersPoints] = useState([])

  const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      if (user) {
        setUserLogged(user)
        console.log(userLogged, "<<<userLeaderboard")
      };
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  };

  useEffect(() => {
    getUserLogged();
  }, []);

  useEffect(() => {
    if(userLogged){
      getUsersPoints().then(({leaderboard}) => {
        setUsersPoints(leaderboard)
      })
    }
  }, [userLogged])
  const currentPlayerScore = usersPoints.find((user) => {
    return user.player_username === userLogged
  })
  console.log(currentPlayerScore, '<<<currentPlayerScore')
  
  // const playersPointData = [
  //   { player_username: "Joe", total_points: 52 },
  //   { player_username: "Jenny", total_points: 38 },
  //   { player_username: "Nikki", total_points: 2 },
  // ];

  // const myData = playersPointData.find(
  //   (ply) => ply.player_username === userLogged
  // );

  // const position = playersPointData.findIndex(
  //   (ply) => ply.player_username === userLogged
  // );

  // const currentPlayerScore = usersPoints.filter((userPoints) => userPoints.player_username === userLogged)
  // console.log(currentPlayerScore)

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.h2}>LeaderBoard</Text>
        <Text style={styles.subtitle}>
          {userLogged? currentPlayerScore.total_points : null}
          {/* My points: {myData.total_points}, position: {position + 1} */}
        </Text>
        <Text style={styles.pointsText}>Points</Text>
      
      </View>

      <Leaderboard
        data={usersPoints}
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
    fontSize: 50,
    textAlign: "center",
  },
  pointsText: {
    fontSize: 25,
    textAlign: 'center'
  }
});
