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
import React, { useEffect, useState } from "react";
import { getCategories } from "../utils/questionsApi";
import Topic from "./Topic";
import TopicFlipCard from "./TopicFlipCard";
import QuizPage from "./QuizPage";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();

  useEffect(() => {
    getCategories().then((data) => {
      const { trivia_categories } = data;
      setTopics(trivia_categories);
    });
  }, []);

  useEffect(() => {
    console.log("selectedTopic :>> ", selectedTopic);
  }, [selectedTopic]);

  if (selectedTopic === undefined) {
    return (
      <ScrollView style={styles.scrollView}>
        {topics.map((topic) => {
          return (
            <Topic
              topic={topic}
              key={topic.id}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
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
