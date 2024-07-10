import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import CustomStyles from "../Styles/CustomStyles";
import CustomInput from "./CustomInput";

export default function EditDetails({ setEditingMode, user, avatars }) {
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar_id);

  if (!avatars) {
    avatars = [];
  }

  const avatarsDrop = avatars.map((avatar) => {
    return { ...avatar, avatar_url: { uri: avatar.avatar_url } };
  });





  const saveUserDetails = () => {
    const newUserData = { ...user, newUsername, newEmail };
    setEditingMode(false);
  };

  return (
    <View style={CustomStyles.container}>
      <Text style={CustomStyles.h3}>Edit Details</Text>
      <CustomInput
        value={newUsername}
        setValue={setNewUsername}
        placeholder="Enter Username"
      />
      <CustomInput
        value={newEmail}
        placeholder="Enter Email"
        onChangeText={setNewEmail}
      />
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        maxHeight={200}
        value={avatar}
        data={avatarsDrop}
        valueField="avatar_id"
        labelField="avatar_name"
        imageField="avatar_url"
        placeholder="Select avatar"
        searchPlaceholder="Search..."
        onChange={(e) => {
          setAvatar(e);
          console.log("Selected Avatar ID:", e);
        }}
      />
      <Button title="Save Details" onPress={saveUserDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    border: "1px solid grey",
    padding: "4px",
  },
  password: {},
  checkbox: { display: "inline-flex", flexDirection: "row" },

  dropdown: {
    marginVertical: 20,
    height: 50,
    width: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
