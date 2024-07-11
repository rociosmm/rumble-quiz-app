import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getQuestions } from "../utils/questionsApi";
import React from "react";
import CountdownTimer from "./Countdown";
import QuestionCard from "./QuestionCard";
import PlayerAvatars from "./PlayerAvatars";
import ProgressBar from "./ProgressBar";
import { socket } from "../socket";
import WaitingRoom from "./WaitingRoom";

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
export default function QuizPage({ topic_id, userLogged }) {
  const [avatarsReceived, setAvatarsReceived] = useState(false)
  useEffect(() => {
    console.warn("<<: mount QuizPage!! :>> ");
    console.log("userLogged mounting QuizPage:>> ", userLogged);
    console.log("<<: topic_id!! QuizPage :>> ", topic_id);
    socket.on("avatars", () => {
      setAvatarsReceived(true)
    })
    return () => {
      console.warn("<<: leaving QuizPage:>> ");
      console.log("userLogged leaving QuizPage:>> ", userLogged);
      // socket.off("avatars", () => {
      //   setAvatarsReceived(false)
      // })
      //socket.emit("leave-game", topic_id, userLogged); works but not in use now
    };
  }, []);

  if(avatarsReceived){
    return (
      <ScrollView>
        <PlayerAvatars />
        <CountdownTimer />
        <QuestionCard userLogged={userLogged} />
      </ScrollView>
    );
  } else {
    return <WaitingRoom />
  }
}
