import { Text, View, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function UrgeWithPleasureComponent() {
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={true}
        duration={10}
        size={80}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}>
        {/* onComplete=
      {() => {
        // do your stuff here
        return { shouldRepeat: true, delay: 1.5 }; // repeat animation in 1.5 seconds
      }} */}
        {({ remainingTime }) => (
          <Text style={styles.countDownText}>{remainingTime}</Text>
        )}
      </CountdownCircleTimer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
  },
  countDownText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
