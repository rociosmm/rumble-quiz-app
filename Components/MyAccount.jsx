import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import EditDetails from "./EditDetails";
import Stats from "./Stats";
import { getAvatar, getUserByUsername } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import { withTheme } from "react-native-paper";
import getUserLogged from "../utils/userLogged"

function MyAccount({ theme, setIsLoggedIn, avatars }) {
  const [colourTheme, setColourTheme] = useState(1);
  const [editingMode, setEditingMode] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userLogged, setUserLogged] = useState("");
  const [userLoggedAvatar, setUserLoggedAvatar] = useState({});
  const { colors } = theme;
  const navigation = useNavigation();

  // console.log("avatars in myaccount>>>", avatars)

  const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      setUserLogged(user);
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  };

  useEffect(() => {
    getUserLogged();
  }, [userLogged]);

  useEffect(() => {
    if (userLogged) {
      // console.log('userLogged useeff my acc', userLogged)
      getUserByUsername(userLogged).then(async ({ user }) => {
        await setUserDetails(user);
      });
    }
  }, [userLogged]);

  useEffect(() => {
    getAvatar(userDetails.avatar_id).then(async (data) => {
      // console.log("data avatar acc :>> ", data.avatar);
      await setUserLoggedAvatar(data.avatar);
      await AsyncStorage.setItem("avatar_url", data.avatar.avatar_url);
    });
  }, [userDetails]);
  // console.log("userLoggedAvatar :>> ", userLoggedAvatar);

  const colour_themes = [
    { colour_theme_id: 1, theme_name: "Light" },
    { colour_theme_id: 2, theme_name: "Dark" },
    { colour_theme_id: 3, theme_name: "Kids" },
  ];

  const displayForm = () => {
    setEditingMode(true);
  };

  const onLogOutPressed = async () => {
    await AsyncStorage.setItem("isLoggedIn", JSON.stringify(false));
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("userLogged", "");
    navigation.navigate("LogIn");
    setIsLoggedIn(false)

  };

  // Styles are defined inside of the component to have access to the theme
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    userCard: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: colors.orange,
      padding: 20,
    },
    userDetails: {
      width: "60%",
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    h2: {
      fontSize: 30,
    },
    h2_bold: {
      fontSize: 25,
      fontWeight: 'bold'
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
  return (
    <>
      <CustomButton type="TERTIARY" text="Log Out" onPress={onLogOutPressed} />
      <View style={styles.userCard}>
        <View style={styles.userDetails}>
          <Text style={styles.h2_bold}>Welcome</Text>
          <Text style={styles.h2}>{userLogged}</Text>
          <Text>{userDetails.email}</Text>
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
          <Image
            source={{ uri: userLoggedAvatar.avatar_url }}
            style={styles.avatar}
          />
        </View>
      </View>
      <ScrollView>
        <View>
          {editingMode ? (
            <EditDetails setEditingMode={setEditingMode} userDetails={userDetails} avatars={avatars}/>
          ) : null}
          {userLogged ? (
            <Stats username={userDetails.username} userLogged={userLogged} />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

export default withTheme(MyAccount);
