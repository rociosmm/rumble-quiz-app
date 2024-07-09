import { Swing } from 'react-native-animated-spinkit'
import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import CustomStyles from '../Styles/CustomStyles'

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <Swing size={48} color="#FFF"/>
    </View>
  )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      },
})
