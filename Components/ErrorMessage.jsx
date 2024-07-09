import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ErrorMessage() {
  return (
    <View>
      <Text style={styles.error}>Invalid Credentials</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    error: {
        color: 'red'
    }
})