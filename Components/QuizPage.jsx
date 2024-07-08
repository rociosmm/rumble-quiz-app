import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getQuestions } from "../utils/questionsApi";
import React from "react";
import UrgeWithPleasureComponent from "./Countdown";
import QuestionCard from "./QuestionCard";
import PlayerAvatars from "./PlayerAvatars";
import ProgressBar from "./ProgressBar";

// export default function QuizPage({ topic_id }) {
//   const [questions, setQuestions] = useState([]);
//   useEffect(() => {
//     getQuestions(topic_id).then(({ data }) => {
//       const { results } = data;
//       console.log("data in quiz page:>> ", Object.keys(data));
//       console.log("results :>> ", results);
//       //const result
//       setQuestions(results);
//     });
//   }, []);

//   return (
//     <View>
//       <Text>{topic_id}</Text>

//       {questions.map((result, index) => {
//         return <Text key={index}>{JSON.stringify(result)}</Text>;
//       })}
//     </View>
//   );
// }
export default function QuizPage() {
  return (
    <ScrollView>
      <PlayerAvatars />
      <UrgeWithPleasureComponent />
      <QuestionCard />
      <ProgressBar />
    </ScrollView>
  );
}
