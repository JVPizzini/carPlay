import React from "react";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

const { Navigator, Screen } = createBottomTabNavigator();
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";

//Screens
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { MyCars } from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";

//svgs
import GameSvg from "../assets/game.svg";
import HomeSvg from "../assets/home.svg";
import AppleSvg from "../assets/apple.svg";

export function AppTabRoutes() {
  const { colors } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.shape,
        tabBarInactiveTintColor: colors.blue_medium200,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? getBottomSpace() : 0,
          height: 60,
          backgroundColor: colors.bookplay_New,
        },
      }}
      initialRouteName="Home"
    >
      <Screen
        name="Start"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <GameSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <AppleSvg width={24} height={24} fill={color} />
          ),
          tabBarHideOnKeyboard:true,
        }}
      />
    </Navigator>
  );
}
