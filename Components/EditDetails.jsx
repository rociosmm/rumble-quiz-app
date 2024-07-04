import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
// import { TextInput } from 'react-native-web'

export default function EditDetails({setEditingMode, user}) {
    const [newUsername, setNewUsername] = useState(user.username)
    const [newEmail, setNewEmail] = useState(user.email)

    const saveUserDetails = () => {
        const newUserData = {...user, newUsername, newEmail}
        setEditingMode(false)
    }

  return (
    <View>
      <Text>Edit Details</Text>
      <TextInput value={newUsername} placeholder="Enter Username" onChangeText={setNewUsername}/>
      <TextInput value={newEmail} placeholder="Enter Email" onChangeText={setNewEmail}/>
      <Button title="Save Details" onPress={saveUserDetails}/>
    </View>
  )
}