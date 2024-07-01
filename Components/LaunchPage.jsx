import { View, Text, Button } from 'react-native'
import React from 'react'


export default function LaunchPage({navigation}) {
  return (
    <Button
    title="Go to Jane's profile"
    onPress={() =>
      navigation.navigate('My Account', {name: 'Jane'})
    }
  />
  )
}

const AccountScreen = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };