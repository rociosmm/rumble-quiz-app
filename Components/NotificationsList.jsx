import { View, Text } from "react-native";
import React from "react";
import { useCountdown } from "react-native-countdown-circle-timer";
import UrgeWithPleasureComponent from "./Countdown";
import QuestionCard from "./QuestionCard";
import PlayerAvatars from "./PlayerAvatars";

export default function NotificationsList() {
  const players = [
    {
      username: "George",
      avatarUrl:
        "https://github.com/nkytruong/rumble-quiz-app/blob/main/assets/avatars/icons8-bear-48.png?raw=true",
    },
    {
      username: "Eve",
      avatarUrl:
        "https://github.com/nkytruong/rumble-quiz-app/blob/main/assets/avatars/icons8-gorilla-48.png?raw=true",
    },
    {
      username: "Daniel",
      avatarUrl:
        "https://github.com/nkytruong/rumble-quiz-app/blob/main/assets/avatars/icons8-lion-48.png?raw=true",
    },
  ];
  return (
    <View>
      <Text>NotificationsList</Text>
      <PlayerAvatars />
      <UrgeWithPleasureComponent />
      <QuestionCard />
    </View>
  );
}
