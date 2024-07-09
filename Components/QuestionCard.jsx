import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { socket } from "../socket";
import { SafeAreaView } from "react-native-safe-area-context";


export default function QuestionCard({ onChoicePress, remainingTime }) {
  const [questionTitle, setQuestionTitle] = useState(null);
  const [answers, setAnswers] = useState([]);

  /*   const question = "What is your favourite topic?";
  const answers = ["history", "science", "film", "art"]; */
  // const Row = ({ children }) => {
  //   <View>{children}</View>;
  // };

  /* const answerSelected = (choice) => {};

  socket.on("question", (question) => {
    console.log("question :>> ", question);
    questionTitle = question.question;
    answers = question.incorrect_answers;

    answers.splice(Math.floor(Math.random() * 4), 0, question.correct_answer);
    console.log("answers :>> ", answers);
    console.log("questionTitle :>> ", questionTitle);

  }); */

  useEffect(() => {
    const handleQuestion = (question) => {
      console.log("question :>> ", question);
      const newQuestionTitle = question.question;
      let newAnswers = question.incorrect_answers;

      newAnswers.splice(
        Math.floor(Math.random() * 4),
        0,
        question.correct_answer
      );
      console.log("answers :>> ", newAnswers);
      console.log("questionTitle :>> ", newQuestionTitle);

      setQuestionTitle(newQuestionTitle);
      console.log("questionTitle :>> ", questionTitle);
      setAnswers(newAnswers);
      console.log("answers :>> ", answers);
    };

    socket.on("question", handleQuestion);

    // Cleanup function to avoid multiple event listeners
    return () => {
      socket.off("question", handleQuestion);
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{questionTitle}</Text>
        <View>
          {answers
            ? answers.map((choice, index) => (
                <Pressable
                  key={index}
                  style={styles.answerButton}
                  onPress={() => onChoicePress(choice)}
                >
                  <Text style={styles.answerText}>{choice}</Text>
                </Pressable>
              ))
            : null}
        </View>
      </View>
    </SafeAreaView>
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
    fontWeight: "bold",
    color: "white",
  },
});
