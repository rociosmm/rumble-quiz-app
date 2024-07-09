import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Leaderboard from "react-native-leaderboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsersPoints } from "../utils/api";
import LoadingSpinner from "./LoadingSpinner";

export default function LeaderBoardPage({ isLoading, setIsLoading }) {
  const [userLogged, setUserLogged] = useState("");
  const [usersPoints, setUsersPoints] = useState([]);

  const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      setUserLogged(user);
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  };

  useEffect(() => {
    getUserLogged();
  }, []);

  useEffect(() => {
    if (userLogged) {
      // console.log("userLogged useeff my leaderboard", userLogged);
      getUsersPoints().then(({ leaderboard }) => {
        setUsersPoints(leaderboard);
        // console.log("userPoints", userPoints);
        setIsLoading(false);
      });
    }
  }, [userLogged]);

  const currentPlayerScore = usersPoints.find((user) => {
    return user.player_username === userLogged;
  });

  // console.log(currentPlayerScore, "<<<currentPlayerScore");

// if(isLoading){
//   return <LoadingSpinner/>
// }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.h2}>LeaderBoard</Text>
        <Text style={styles.subtitle}>
          {currentPlayerScore ? (
            currentPlayerScore.total_points
          ) : (
            <LoadingSpinner />
          )}
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
    textAlign: "center",
  },
});
