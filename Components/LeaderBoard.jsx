import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Leaderboard from 'react-native-leaderboard';

export default function LeaderBoard() {
    const playersPointData = [{player_username: 'Joe', total_points: 52}, {player_username: 'Jenny', total_points: 38}, {player_username: 'Nikki', total_points: 72}]

  return (
    <View>
      <Text style={styles.title}>LeaderBoard</Text>
      
      <Leaderboard 
        data={playersPointData} 
        sortBy='total_points' 
        labelBy='player_username'/>
    </View>
  )
}

const styles = StyleSheet.create({
title: {
    fontSize: 30,
    textAlign: "center"
}
})