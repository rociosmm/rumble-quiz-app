import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function QuestionCard({ question, onChoicePress }) {
  const answers = ["history", "science", "film", "art"];
  // const Row = ({ children }) => {
  //   <View>{children}</View>;
  // };
  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{question}</Text>
      <View>
        {answers.map((choice, index) => (
          <Pressable
            key={index}
            style={styles.answers}
            onPress={() => onChoicePress(choice)}>
            <Text>{choice}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  questionCard: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    width: "90%",
    alignSelf: "center",
  },
  questionText: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 25,
    alignSelf: "center",
  },

  answers: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#ff8c00",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    width: "90%",
    alignSelf: "center",
  },
});
