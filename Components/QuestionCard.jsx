import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function QuestionCard({ onChoicePress }) {
  const question = "What is your favourite topic?";
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
            style={styles.answerButton}
            onPress={() => onChoicePress(choice)}>
            <Text style={styles.answerText}>{choice}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  questionCard: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    paddingTop: 38,
    width: "90%",
    alignSelf: "center",
  },
  questionText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },

  answerButton: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#ff8c00",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  answerText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
