import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
// import { TextInput } from 'react-native-web'
import { SelectCountry } from "react-native-element-dropdown";

export default function EditDetails({ setEditingMode, user }) {
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar_id);

  const saveUserDetails = () => {
    const newUserData = { ...user, newUsername, newEmail };
    setEditingMode(false);
  };

  const mockAvatars = [
    {
      id: 1,
      avatar_name: "Dog",
      avatar_url: {
        uri: "https://t3.ftcdn.net/jpg/05/68/02/36/360_F_568023692_15idt2j4V5fvXr2YDTbijyl292IRyyMJ.jpg"
      },
    },
    {
      id: 2,
      avatar_name: "Rabbit",
      avatar_url: {
        uri: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/44f51c73-28ff-4bfc-b43b-66684b142ad7/d17edb86-1339-4792-a9a9-65c562ecdea6.png"
      },
    },
    {
      id: 3,
      avatar_name: "Mouse",
      avatar_url: {
        uri: "https://t4.ftcdn.net/jpg/06/01/00/69/360_F_601006904_wViEKbajtiuedx0ycffTkpTeVi1TrFpn.jpg"
      },
    },
  ];

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
        data={mockAvatars}
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
