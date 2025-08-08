import React from "react";
import ProfileScreen from "../../screens/profileScreen/profileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";
import HomeScreen from "../../screens/homePage/homeScreen/homeScreen";
import { useContext } from "react";
import { Text } from "react-native";
import {
  HomeIcon,
  HomeIconFilledLight,
  HomeIconFilledDark,
  InteretsIcon,
  InterestesIconFilledLight,
  InterestesIconFilledDark,
  SavedIcon,
  SavedIconFilledLight,
  SavedIconFilledDark,
  ProfileIcon,
  ProfileIconFilledLight,
  ProfileIconFilledDark,
} from "../../assets/icons/components/bottomNavigation";
import NewsScreen from "../../screens/newsScreen/newsScreen";

import fontFamily from "../../assets/styles/fontFamily";
import HomeScreenStack from "../homeScreenStack/homeScreenStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import InterestsScreen from "../../screens/InterestsScreen/InterestsScreen";
import { ThemeContext } from "../../context/themeContext";
import { colors } from "../../assets/styles/colors";
import ChooseYourInterests from "../../screens/chooseYourInterests/chooseYourInterests";
import { BottomTabParamList, HomeStackParamList } from "../../types/navigation";
import ProfileScreenStack from "../profileScreenStack/profileScreenStack";
import SavedArticles from "../../screens/savedArticle/savedArticle";
const Tab = createBottomTabNavigator<BottomTabParamList>();
const { width, height } = Dimensions.get("window");

export default function BottomTabNavigator() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const tabsData: {
    name: keyof BottomTabParamList;
    component: React.ComponentType<any>;
    Icon: React.ComponentType<{ width: number; height: number }>;
    FocusedIcon: React.ComponentType<{ width: number; height: number }>;
  }[] = [
    {
      name: "Home",
      component: HomeScreenStack,
      Icon: HomeIcon,
      FocusedIcon: theme === "dark" ? HomeIconFilledDark : HomeIconFilledLight,
    },
    {
      name: "Saved",
      component: SavedArticles,
      Icon: SavedIcon,
      FocusedIcon:
        theme === "dark" ? SavedIconFilledDark : SavedIconFilledLight,
    },
    {
      name: "Interests",
      component: ChooseYourInterests,
      Icon: InteretsIcon,
      FocusedIcon:
        theme === "dark" ? InterestesIconFilledDark : InterestesIconFilledLight,
    },
    {
      name: "Profile",
      component: ProfileScreenStack,
      Icon: ProfileIcon,
      FocusedIcon:
        theme === "dark" ? ProfileIconFilledDark : ProfileIconFilledLight,
    },
  ];
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        // Get the current child route inside each tab
        const routeName = getFocusedRouteNameFromRoute(route) ?? "";

        // Dynamic background logic
        const isOnHeadlineDetails =
          route.name === "Home" && routeName === "HeadlineDetailsScreen";
        return {
          headerShown: false,
          tabBarStyle: {
            backgroundColor:
              theme === "dark" ? colors.darkPrimaryBackground : "#FBFBFE",
            borderTopWidth: 0,
            elevation: 10,
            height: height * 0.1,
            paddingTop: 16,
            paddingHorizontal: 20,
          },
          // tabBarItemStyle: {
          //   justifyContent: "center",
          //   alignItems: "center",
          // },
          sceneContainerStyle: {
            backgroundColor: isOnHeadlineDetails ? "#E5E4E2" : "#FBFFF1", // Covers under tabBar
          },
        };
      }}
    >
      {tabsData.map(({ name, component, Icon, FocusedIcon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontFamily: fontFamily.bottomNavigationText,
                  fontSize: 12,
                  textAlign: "center",
                  color: focused
                    ? theme === "dark"
                      ? colors.vigenaryText
                      : colors.sexdenaryText
                    : colors.darkSenaryText,
                }}
              >
                {name}
              </Text>
            ),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FocusedIcon width={24} height={24} />
              ) : (
                <Icon width={24} height={24} />
              ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
