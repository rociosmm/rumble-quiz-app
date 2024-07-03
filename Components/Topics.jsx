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
      {topics.map((topic) => {
        return (
          <Text key={topic.id}>
            {topic.id} {topic.name}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topic_card: {
    padding: 30,
    marginVertical: 5,
    backgroundColor: "yellow",
  },
});
