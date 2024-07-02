import { View, Text } from 'react-native'
import React from 'react'

export default function Header({userLogged}) {
  return (
    <View>
      <Text>{userLogged}</Text>
    </View>
  )
}
