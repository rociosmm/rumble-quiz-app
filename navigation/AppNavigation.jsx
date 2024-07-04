import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import QuizContainer from '../Components/QuizContainer';
import NotificationsList from '../Components/NotificationsList';
import Friends from '../Components/Friends';
import {useNavigation} from '@react-navigation/native'
import LeaderBoard from '../Components/LeaderBoard';
import MyAccount from '../Components/MyAccount';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function AppNavigation() {
  const navigation = useNavigation()
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Play':
        icon = 'extension-puzzle';
        break;
      case 'My Account':
        icon = 'person';
        break;
        case 'Leaderboard':
          icon = 'trophy';
          break;
          case 'Friends':
            icon = 'people-sharp';
            break;
            case 'Notifications':
            icon = 'notifications-sharp';
            break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
  
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="Play"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Play")}
            >
              <Ionicons name={'extension-puzzle'} color="gray" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="Leaderboard"
          position="LEFT"
          component={() => <LeaderBoard />}
        />
        <CurvedBottomBarExpo.Screen
          name="My Account"
          position="LEFT"
          component={() => <MyAccount />}
        />
        <CurvedBottomBarExpo.Screen
          name="Play"
          position="CIRCLE"
          component={() => <QuizContainer />}
        />
        <CurvedBottomBarExpo.Screen
          name="Friends"
          component={() => <Friends />}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="Notifications"
          component={() => <NotificationsList />}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
    
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
