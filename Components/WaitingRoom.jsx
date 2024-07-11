import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import Logo from "../assets/Designer.jpeg";
import AnimatedText from "./AnimatedText";

const ANGLE = 10;
const TIME = 100;
const PAUSE_DURATION = 1000; // pause duration in milliseconds
const WOBBLE_COUNT = 8; // number of wobbles before pause
const EASING = Easing.linear;

export default function WaitingRoom() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    const startAnimation = () => {
      rotation.value = withRepeat(
        withSequence(
          // Initial move to start from -ANGLE
          withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
          // Wobble between -ANGLE and ANGLE
          withRepeat(
            withSequence(
              withTiming(ANGLE, { duration: TIME, easing: EASING }),
              withTiming(-ANGLE, { duration: TIME, easing: EASING })
            ),
            WOBBLE_COUNT,
            false
          ),
          // Go back to 0 at the end
          withTiming(0, { duration: TIME / 2, easing: EASING }),
          // Pause for a while
          withDelay(PAUSE_DURATION, withTiming(0, { duration: 0 }))
        ),
        -1, // -1 for infinite repeat
        false // do not reverse the entire sequence on repeat
      );
    };

    startAnimation();
  }, [rotation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Image source={Logo} style={styles.image} />
      </Animated.View>
      <View style={styles.textContainer}>
        {/* <AnimatedText /> */}
        <Text>Waiting for more players...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Ensure background color matches the app theme
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginTop: 300,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
