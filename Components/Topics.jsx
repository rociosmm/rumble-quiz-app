import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Button,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { getCategories } from "../utils/questionsApi";
import Topic from "./Topic";
import TopicFlipCard from "./TopicFlipCard";
import QuizPage from "./QuizPage";
import { socket } from "../socket";

export default function Topics({userLogged, setUserLogged}) {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();
  const [avatar, setAvatar] = useState()

  const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      const avatar = await AsyncStorage.getItem("avatar_url")
      console.log(avatar, 'AVATAR')
      setUserLogged(user);
      setAvatar(avatar)
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  };
  useEffect(() => {
    getCategories().then((data) => {
      const { trivia_categories } = data;
      setTopics(trivia_categories);
    });
    getUserLogged()
  }, []);

  const handleSelection = (e) => {
    console.log(e, '<<<< EVENT')
    setSelectedTopic(e)
    console.log(userLogged, avatar, "<<<<Both")
    if(userLogged && avatar) {
      console.log("Hello from the inside")
      socket.emit("topic-selected", selectedTopic, {username: userLogged, avatar_url: avatar}, () => {
        console.log('Hellooo from the client')
      })
    }
  }
  // useEffect(() => {
  //   console.log("selectedTopic :>> ", selectedTopic);
  // }, [selectedTopic]);

  if (selectedTopic === undefined) {
    return (
      <ScrollView style={styles.scrollView}>
        {topics.map((topic) => {
          return (
            <Topic
              topic={topic}
              key={topic.id}
              selectedTopic={selectedTopic}
              setSelectedTopic={handleSelection}
            />
          );
        })}
      </ScrollView>
    );
  } else {
    return <QuizPage topic_id={selectedTopic} />;
  }
}

const styles = StyleSheet.create({
  scrollView: {
    //
  },
});
