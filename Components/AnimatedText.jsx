// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { TypingAnimation } from 'react-native-typing-animation';

// export default function AnimatedText() {
//   const [displayedText, setDisplayedText] = useState('');
//   const text = 'Waiting for more players';

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayedText((prev) => prev + text[index]);
//       console.log('Updated Text:', displayedText); // Debug log
//       index++;
//       if (index === text.length) {
//         clearInterval(interval);
//       }
//     }, 150); // Adjust the speed here

//     // Clear the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>{displayedText}</Text>
//       <TypingAnimation
//         dotRadius={4}
//         dotMargin={5}
//         dotColor="black"
//         style={styles.typingIndicator}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   typingIndicator: {
//     marginTop: -10,
//     marginLeft: 10,
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { TypingAnimation } from 'react-native-typing-animation';

// export default function AnimatedText() {
//   const [displayedText, setDisplayedText] = useState('');
//   const text = 'Waiting for more players';

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayedText((prev) => prev + text[index]);
//       index++;
//       if (index === text.length) {
//         clearInterval(interval);
//       }
//     }, 150); // Adjust the speed here
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>hello</Text>
//       <TypingAnimation
//         dotRadius={4}
//         dotMargin={5}
//         dotColor="black"
//         style={styles.typingIndicator}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   typingIndicator: {
//     marginTop: 10,
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TypingAnimation } from 'react-native-typing-animation';

export default function AnimatedText() {
  const [displayedText, setDisplayedText] = useState('');
  const text = 'Waiting for more players';
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(async() => {
      await setDisplayedText((prev) => {
        console.log('prev char', prev)
        return prev + text[index]});
      console.log('Updated Text:', displayedText); // Debug log
      index++;
      console.log('index', index)
      if (index === text.length) {
        clearInterval(interval);
        setIsTyping(false); // Stop typing animation
      }
    }, 150); // Adjust the speed here

    // Clear the interval when the component unmounts
    return () => {clearInterval(interval); setDisplayedText('')};
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayedText}</Text>
      <TypingAnimation
        dotRadius={4}
        dotMargin={5}
        dotColor="black"
        style={styles.typingIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black'
  },
  typingIndicator: {
    marginTop: -10,
    marginLeft: 10,
  },
});
