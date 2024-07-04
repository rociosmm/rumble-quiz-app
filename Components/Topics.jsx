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
import TopicFlipCard from "./TopicFlipCard"

export default function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      const { trivia_categories } = data;
      setTopics(trivia_categories);
    });
  }, []);

  //console.log("topics :>> ", topics);

  const onPressFunction = (topic_id) => {
    alert(topic_id);
  };

  //const renderItem = ({ item }) => <Topic key={item.id} topic={item} />;

  return (
        <ScrollView style={styles.scrollView}>
        {topics.map((topic) => {
          return (
            <TopicFlipCard topic={topic} key={topic.id}/>
          );
        })}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
  // 
  },
})