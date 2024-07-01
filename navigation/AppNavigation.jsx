import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from "react-native-animated-nav-tab-bar";
import Icon from "react-native-vector-icons/Feather";
import styled from "styled-components/native";
import QuizContainer from "../Components/QuizContainer";
import MyAccount from "../Components/MyAccount";
import NotificationsList from "../Components/NotificationsList";
import Friends from "../Components/Friends";

const Tabs = AnimatedTabBarNavigator();

const Screen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const TabBarIcon = ({ name, size = 24, tintColor }) => {
  return <Icon name={name} size={size} color={tintColor} />;
};

export default () => (
  <Tabs.Navigator
    initialRouteName="New game"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;

        if (route.name === "New game") {
          iconName = "home";
        } else if (route.name === "My account") {
          iconName = "user";
        } else if (route.name === "Notifications") {
          iconName = "inbox";
        } else if (route.name === "Friends") {
          iconName = "users";
        }

        return (
          <TabBarIcon focused={focused} tintColor={color} name={iconName} />
        );
      },
      tabBarActiveTintColor: "#ffffff",
      tabBarInactiveTintColor: "#223322",
      tabBarActiveBackgroundColor: "red",
    })}
    appearance={{
      shadow: true,
      floating: true,
      whenActiveShow: TabElementDisplayOptions.ICON_ONLY,
      dotSize: DotSize.SMALL,
    }}
  >
    <Tabs.Screen name="New game" component={QuizContainer} />
    <Tabs.Screen name="Friends" component={Friends} />
    <Tabs.Screen name="My account" component={MyAccount} />
    <Tabs.Screen name="Notifications" component={NotificationsList} />
  </Tabs.Navigator>
);
