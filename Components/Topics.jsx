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
    <View>
      <ScrollView>
        {topics.map((topic) => {
          return (
            <Pressable key={topic.id} onPress={() => onPressFunction(topic.id)}>
              <Topic topic={topic} />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
