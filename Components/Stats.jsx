import { View, Text } from 'react-native'
import React from 'react'

export default function Stats({username}) {

  const userStats = {
    games_played: 2,
    games_won: 1,
    total_points: 170,
    top_topic: "General Knowledge"
  }


  return (
    <View>
      <Text>Your Stats</Text>
      <Text>Total Games Played: {userStats.games_played}</Text>
      
    </View>
  )
}