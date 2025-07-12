import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";
import HomeScreen from "../../screens/homePage/homeScreen/homeScreen";
import { useContext } from "react";
import { Text } from "react-native";
import {
  HomeIcon,
  HomeIconBlue,
  HomeIconPurple,
  HomeIconWhite,
  NewsIcon,
  NewsIconPurple,
  NewsIconBlue,
  NewsIconWhite,
  IntrestIcon,
  IntrestIconWhite,
  IntrestIconPurple,
  IntrestIconBlue,
  ProfileIcon,
  ProfileIconPurple,
  ProfileIconBlue,
  ProfileIconWhite,
} from "../../assets/icons/components/bottomNavigation";
import NewsScreen from "../../screens/newsScreen/newsScreen";
import ProfileScreen from "../../screens/profileScreen/profileScreen";
import fontFamily from "../../assets/styles/fontFamily";
import HomeScreenStack from "../homeScreenStack/homeScreenStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import InterestsScreen from "../../screens/InterestsScreen/InterestsScreen";
import { ThemeContext } from "../../context/themeContext";
import { colors } from "../../assets/styles/colors";
import ChooseYourInterests from "../../screens/chooseYourInterests/chooseYourInterests";
const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

export default function BottomTabNavigator() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const tabsData = [
    {
      name: "HomeStack",
      component: HomeScreenStack,
      Icon: theme === "dark" ? HomeIconWhite : HomeIcon,
      FocusedIcon: theme === "dark" ? HomeIconPurple : HomeIconBlue,
    },
    {
      name: "News",
      component: NewsScreen,
      Icon: theme === "dark" ? NewsIconWhite : NewsIcon,
      FocusedIcon: theme === "dark" ? NewsIconPurple : NewsIconBlue,
    },
    {
      name: "Interests",
      component: ChooseYourInterests,
      Icon: theme === "dark" ? IntrestIconWhite : IntrestIcon,
      FocusedIcon: theme === "dark" ? IntrestIconPurple : IntrestIconBlue,
    }, // No focused version provided
    {
      name: "Profile",
      component: ProfileScreen,
      Icon: theme === "dark" ? ProfileIconWhite : ProfileIcon,
      FocusedIcon: theme === "dark" ? ProfileIconPurple : ProfileIconBlue,
    }, // No focused version provided
  ];
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        // Get the current child route inside each tab
        const routeName = getFocusedRouteNameFromRoute(route) ?? "";

        // Dynamic background logic
        const isOnHeadlineDetails =
          route.name === "HomeStack" && routeName === "HeadlineDetailsScreen";
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
                    ? "#4139E5"
                    : theme === "dark"
                    ? colors.darkPrimaryText
                    : colors.primaryText,
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
