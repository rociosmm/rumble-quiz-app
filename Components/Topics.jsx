import { ScrollView, SafeAreaView, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { getCategories } from "../utils/questionsApi";
import Topic from "./Topic";
import TopicFlipCard from "./TopicFlipCard";
import QuizPage from "./QuizPage";
import { socket } from "../socket";

export default function Topics({ userLogged, setUserLogged }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();
  const [avatar, setAvatar] = useState();

  const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      const avatar = await AsyncStorage.getItem("avatar_url");
      console.log(avatar, "AVATAR");
      setUserLogged(user);
      setAvatar(avatar);
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  };
  useEffect(() => {
    getCategories().then((data) => {
      const { trivia_categories } = data;
      setTopics(trivia_categories);
    });
    getUserLogged();
  }, []);

  const handleSelection = async (id) => {
    console.log(id, "<< id");
    await setSelectedTopic(id);
    console.log(selectedTopic, "<<<<SELECTEDTOPIC");
    if (userLogged && avatar) {
      socket.emit(
        "topic-selected",
        id,
        { username: userLogged, avatar_url: avatar },
        () => {
          console.log("Hellooo from the client");
        }
      );
    }
  };
  // useEffect(() => {
  //   console.log("selectedTopic :>> ", selectedTopic);
  // }, [selectedTopic]);

  if (selectedTopic === undefined) {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <ScrollView>
          {topics.map((topic) => {
            return (
              <Pressable
                key={topic.id}
                onPress={() => handleSelection(topic.id)}>
                <Topic topic={topic} />
              </Pressable>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <QuizPage topic_id={selectedTopic} />;
  }
}

const styles = StyleSheet.create({
  SafeAreaView: {
    marginBottom: 215,
  },
});
