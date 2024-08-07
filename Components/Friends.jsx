import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getAvatar, getFriends, getUserByUsername } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import { UserContext } from "../context/UserContext";
export default function Friends() {
  //const [userLogged, setUserLogged] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendsDetails, setFriendsDetails] = useState([]);
  const { userLogged, login } = useContext(UserContext);

  useEffect(() => {
    if (userLogged) {
      getFriends(userLogged)
        .then((data) => {
          //console.log("data friends endpoint :>> ", data);
          const friends_usernames = data.map((fr) => fr.user2_username);
          setFriends(friends_usernames);
        })
        .catch((err) => console.log("err :>> ", err));
    }
  }, []);

  useEffect(() => {
    if (friends.length > 0) {
      friends.map((friend) => {
        getUserByUsername(friend).then(({ user }) => {
          getAvatar(user.avatar_id)
            .then(({ avatar }) => {
              /* console.log("user inside getUserByUsername Nested :>> ", user);
            console.log("avatar nested :>> ", avatar); */
              const fullFriendData = { ...user, avatar_url: avatar.avatar_url };
              setFriendsDetails((currentData) => {
                return [...currentData, fullFriendData];
              });
            })
            .catch((err) => console.log("err :>> ", err));
        });
      });
    }
  }, [friends]);

  const renderFriendCard = (friend) => {
    return (
      <View style={styles.card}>
        <View style={styles.avatar_image}>
          <Avatar.Image source={{ uri: friend.avatar_url }} />
        </View>
        <View style={styles.friendDetails}>
          <View style={styles.friendInfo}>
            <Text style={styles.friendUsername}>{friend.username}</Text>
            <View
              style={
                friend.online
                  ? styles.onlineStatusIndicator
                  : styles.offlineStatusIndicator
              }
            />
          </View>
          <Text style={styles.onlineStatus}>
            {friend.online ? "Online" : "Offline"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={styles.h2}>Friends</Text>
      </View>
      <View style={styles.friendsList}>
        {friendsDetails.map((friend) => (
          <View style={styles.cardContainer} key={friend.username}>
            {renderFriendCard(friend)}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBanner: {
    backgroundColor: "rgb(30, 144, 255)",
    paddingVertical: 15,
    alignItems: "center",
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  friendsList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  avatar_image: {
    width: "15%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendDetails: {
    //flex: 1,
    width: "60%",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  friendUsername: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  offlineStatusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff0000",
  },
  onlineStatusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "green",
  },
  onlineStatus: {
    fontSize: 16,
    color: "#555555",
  },
});
