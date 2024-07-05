import { View, Text } from "react-native";
import React from "react";
import { useCountdown } from "react-native-countdown-circle-timer";
import UrgeWithPleasureComponent from "./Countdown";
import QuestionCard from "./QuestionCard";

export default function NotificationsList() {
  return (
    <View>
      <Text>NotificationsList</Text>
      <UrgeWithPleasureComponent />
      <QuestionCard />
    </View>
  );
}
