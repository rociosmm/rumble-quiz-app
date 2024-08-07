import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import CustomStyles from "../Styles/CustomStyles";
import CustomInput from "./CustomInput";
import { patchUserByUsername } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function EditDetails({
  setEditingMode,
  userDetails,
  avatars,
  setUpdated,
}) {
  const [newUsername, setNewUsername] = useState(userDetails.username);
  const [newEmail, setNewEmail] = useState(userDetails.email);
  const [selectedAvatarId, setSelectedAvatarId] = useState(
    userDetails.avatar_id
  );
  const { userLogged, editUser, logout } = useContext(UserContext);
  const navigation = useNavigation();
  console.log(userDetails, "<<: userDetails");

  if (!avatars) {
    avatars = [];
  }

  const avatarsDrop = avatars.map((avatar) => {
    return { ...avatar, avatar_url: { uri: avatar.avatar_url } };
  });

  console.log("newUsername, newEmail, selectedAvatarId");
  console.log(newUsername, newEmail, selectedAvatarId);

  const saveUserDetails = async () => {
    // const newUserData = { ...user, newUsername, newEmail };
    const patchBody = {
      username: newUsername,
      email: newEmail,
      avatar_id: selectedAvatarId,
    };
    console.log("patchBody :>> ", patchBody);

    editUser(userDetails.username, patchBody);
    if (userDetails.username !== patchBody.username) {
      logout(navigation);
    }
    setEditingMode(false);
    setUpdated(true);
    /*  try {
      await patchUserByUsername(userDetails.username, patchBody);
      console.log("Response", res);
      await AsyncStorage.setItem("userLogged", newUsername);
      const userLogged = await AsyncStorage.getItem("userLogged");
      console.log("Updated userLogged, userLogged");
      
    } catch (err) {
      console.log("Error updating user details", err);
      alert("Unable to process change", "Please try again later", [
        { text: "OK" },
      ]);
    } */
  };

  return (
    <View style={CustomStyles.container}>
      <Text style={CustomStyles.h3}>Edit Details</Text>
      <Text style={styles.input_titles}>Username</Text>
      <CustomInput
        value={newUsername}
        setValue={setNewUsername}
        placeholder="Enter Username"
      />
      <Text style={styles.input_titles}>Email</Text>
      <CustomInput
        value={newEmail}
        setValue={setNewEmail}
        placeholder="Enter Email"
      />
      <Text style={styles.input_titles}>Avatar</Text>
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        maxHeight={200}
        value={selectedAvatarId}
        data={avatarsDrop}
        valueField="avatar_id"
        labelField="avatar_name"
        imageField="avatar_url"
        placeholder="Select avatar"
        searchPlaceholder="Search..."
        onChange={(e) => {
          setSelectedAvatarId(e.avatar_id);
          // console.log("Selected Avatar ID:", e);
        }}
      />
      <View style={styles.buttons}>
        <Button
          title="Cancel"
          color="red"
          onPress={() => {
            setEditingMode(false);
          }}
        />
        <Button title="Save Details" onPress={saveUserDetails} />
      </View>
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
  buttons: { display: "flex", flexDirection: "row" },
  dropdown: {
    marginBottom: 20,
    marginTop: 6,
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
  input_titles: {
    alignSelf: "flex-start",
    marginTop: 5,
    fontSize: 16,
    color: "grey",
  },
});
