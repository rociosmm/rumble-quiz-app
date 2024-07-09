import { View, Text } from "react-native";

import React from "react";
import LeaderBoard from "./LeaderBoardPage";

import React, { useState, useEffect } from "react";
import { getFriends, getUserByUsername } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomStyles from "../Styles/CustomStyles";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Friends() {
  const [userLogged, setUserLogged] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendsDetails, setFriendsDetails] = useState([]);

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
  }, []);

  useEffect(() => {
    if (userLogged) {
      getFriends(userLogged).then((data) => {
        console.log("data friends endpoint :>> ", data);
        const friends_usernames = data.map((fr) => fr.user2_username);
        setFriends(friends_usernames);
      });
    }
  }, [userLogged]);

  useEffect(() => {
    if (friends.length > 0) {
      const fetchFriendsDetails = async () => {
        const details = await Promise.all(
          friends.map((friend) => getUserByUsername(friend))
        );
        const users = details.map(({ user }) => user);
        setFriendsDetails(users);
      };
      fetchFriendsDetails();
    }
  }, [friends]);

  return (
    <SafeAreaView>
      <View style={CustomStyles.topBanner}>
        <Text style={CustomStyles.h2}>Friends</Text>
      </View>
      <View style={{ paddingVertical: 20 }}>
        {friendsDetails.map((friend) => {
          console.log("friend indv :>> ", friend);
          return (
            <Text style={CustomStyles.h3} key={friend.username}>
              {friend.username}
            </Text>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
