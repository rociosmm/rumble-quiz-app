import { View, Text, Button, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import EditDetails from "./EditDetails";

export default function MyAccount() {
  const [colourTheme, setColourTheme] = useState(1)
  const [editingMode, setEditingMode] = useState(false)
  
  const user = {
    username: "Nikki",
    email: "nikki@nikki.com",
    avatar_id: 2,
    colour_theme_id: 1,
    isChild: false,
  };

  const avatar_url = "https://media.istockphoto.com/id/1097490360/vector/vector-illustration-of-cute-black-cat.jpg?s=612x612&w=0&k=20&c=Ef0qYl79aZJ6NJXJVbJ0onjXVNnSyqrN_TKPjieAIGE="

const colour_themes = [{colour_theme_id: 1, theme_name: "Light"}, {colour_theme_id: 2, theme_name: "Dark"}, {colour_theme_id: 3, theme_name: "Kids"}]

const displayForm = () => {
setEditingMode(true)
}

  return (
    <>
    <View style={styles.userCard}>
      <View style={styles.userDetails}>
      <Text style={styles.h2}>{user.username}</Text>
      <Text>{user.email}</Text>
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        maxHeight={200}
        value={colourTheme}
        data={colour_themes}
        valueField="id"
        labelField="theme_name"
        imageField="avatar_url"
        placeholder="Select Colour Theme"
        searchPlaceholder="Search..."
        onChange={(e) => {
          setColourTheme(e.value);
        }}
      />
      <Button title="Edit details" onPress={displayForm} />
      </View>
      <View>
        <Image source={{uri: avatar_url}} style={styles.avatar}/>
        </View>
    </View>
    <View>
      {editingMode ? <EditDetails setEditingMode={setEditingMode} user={user}/> : null}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  userCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#CCAE2F"
  },
  userDetails: {
    width: '60%'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  h2: {
    fontSize: 30
  },
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
});

