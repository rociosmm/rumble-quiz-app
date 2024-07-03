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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Topics</Text>
          {/* <FlatList
              data={topics}
              keyExtractor={(topic) => topic["id"]}
              content
              ContainerStyle={{ padding: 20 }}
            />

            <FlatList
              data={topics}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <Topic
                    item={item}
                  />
                );
              }}
            /> */}

          <View style={{ flex: 1, padding: 20, backgroundColor: "pink" }}>
            {topics.map((topic) => (
              <Text key={topic.id}>{topic.name}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
