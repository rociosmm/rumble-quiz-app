import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { socket } from "../socket";
import { SafeAreaView } from "react-native-safe-area-context";
import { withTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from "./ProgressBar";

function QuestionCard({ theme, remainingTime }) {
  const { colors } = theme;
  const [questionTitle, setQuestionTitle] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(null);
  const [userLogged, setUserLogged] = useState("");
  const [resultColor, setResultColor] = useState("");

  const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      setUserLogged(user);
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  };

  useEffect(() => {
    getUserLogged();
    console.log("userLogged blablabla :>> ", userLogged);

    if (userLogged) {
      const handleQuestion = (question) => {
        console.log("question :>> ", question);
        const newQuestionTitle = question.question;
        let newAnswers = question.incorrect_answers;
        setRightAnswer(question.correct_answer);

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
    }
  }, [userLogged]);

  const onChoicePress = (choice) => {
    const eliminated = choice === rightAnswer ? false : true;
    const answersFeedback = {
      username: userLogged,
      eliminated,
      points: 3,
    };

    socket.emit("answer", answersFeedback);

    console.log("answersFeedback :>> ", answersFeedback);
    let resultColor;
    if (choice === rightAnswer) {
      setResultColor("green");
      console.log("WIN!!!");
    } else {
      setResultColor("red");
      console.log("LOSE :(");
    }
  };

  // Styles are defined inside of the component to have access to the theme
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
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
      textAlign: "center",
    },
    answerCards: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
    },
    answerButton: {
      borderRadius: 8,
      elevation: 3,
      //backgroundColor: "#ff8c00",
      shadowOffset: { width: 1, height: 1 },
      shadowColor: "#333",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 4,
      marginVertical: 6,
      paddingVertical: 15,
      paddingHorizontal: 10,
      alignItems: "center",
      minWidth: "45%",
    },
    answerText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
  });
  return (
    <SafeAreaView>
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{questionTitle}</Text>
        <View style={styles.answerCards}>
          {answers
            ? answers.map((choice, index) => (
                <Pressable
                  key={index}
                  disabled={resultColor === "" ? false : true}
                  style={({ pressed }) => [
                    { backgroundColor: pressed ? resultColor : "#ff8c00" },
                    styles.answerButton,
                  ]}
                  onPress={() => onChoicePress(choice)}
                >
                  <Text style={styles.answerText}>{choice}</Text>
                </Pressable>
              ))
            : null}
        </View>
      </View>
      <ProgressBar />
    </SafeAreaView>
  );
}

export default withTheme(QuestionCard);
