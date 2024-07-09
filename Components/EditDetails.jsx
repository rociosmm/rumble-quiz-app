import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import { getAvatars } from "../utils/api";

export default function EditDetails({ setEditingMode, user }) {
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
  const [avatars, setAvatars] = useState([]);
  const [avatar, setAvatar] = useState(user.avatar_id);

  useEffect(() => {
    getAvatars().then(({ avatars }) => {
      setAvatars(avatars);
      // console.log(avatars);
    });
  }, []);

  const saveUserDetails = () => {
    const newUserData = { ...user, newUsername, newEmail };
    setEditingMode(false);
  };

  return (
    <View>
      <Text>Edit Details</Text>
      <TextInput
        value={newUsername}
        placeholder="Enter Username"
        onChangeText={setNewUsername}
      />
      <TextInput
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
        data={avatars}
        valueField="id"
        labelField="avatar_name"
        imageField="avatar_url"
        placeholder="Select avatar"
        // searchPlaceholder="Search..."
        onChange={(e) => {
          setAvatar(e.value);
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
    width: 50,
    height: 50,
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
