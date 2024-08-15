import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { UserContext } from "../context/UserContext";
import { getGameLogForUser } from "../utils/api";
import { DataTable } from "react-native-paper";

export default function EndOfGame({ endOfGameResult, gameId }) {
  const { userLogged } = useContext(UserContext);
  const [userGameLog, setUserGameLog] = useState({});

  useEffect(() => {
    if (gameId) {
      console.log("gameId inside if :>> ", gameId);
      getGameLogForUser(gameId, userLogged).then((log) => {
        setUserGameLog(log);
      });
    }
  }, [gameId]);

  return (
    // <ImageBackground
    //   source={require("../assets/jigsaw_puzzle_frame_6_a_white.jpg")}
    // >
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          {endOfGameResult === "win" ? "You Win!" : "You Lose!"}
        </Text>
        {!gameId ? <Text style={styles.text}>"Loading..."</Text> : null}
      </View>
      {Object.keys(userGameLog).length > 0 ? (
        <DataTable style={styles.tableContainer}>
          <DataTable.Row>
            <DataTable.Cell style={styles.stat_title}>
              Game result
            </DataTable.Cell>
            <DataTable.Cell style={styles.stat_data}>
              {userGameLog.won_game ? "You won" : "You lost"}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={styles.stat_title}>
              Game Points
            </DataTable.Cell>
            <DataTable.Cell style={styles.stat_data}>
              {userGameLog.points}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={styles.stat_title}>
              Topic Played
            </DataTable.Cell>
            <DataTable.Cell style={styles.stat_data}>
              {userGameLog.topic_name}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      ) : null}
    </SafeAreaView>
    // </ImageBackground>
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
    textAlign: "center",
    //color: result === "win" ? "green" : "red",
  },
  tableContainer: {
    paddingTop: 15,
  },
  stat_title: {
    backgroundColor: "#DCDCDC",
    paddingLeft: 20,
  },
  stat_data: {
    paddingLeft: 20,
    borderColor: "grey",
    borderWidth: 1,
  },
});
