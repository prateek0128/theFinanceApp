import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";
import HomeScreen from "../../screens/homePage/homeScreen/homeScreen";

import HomeIcon from "../../assets/icons/components/bottomNavigation/HomeIcon";
import HomeBlack from "../../assets/icons/components/bottomNavigation/HomeBlack";
import NewsIcon from "../../assets/icons/components/bottomNavigation/NewsIcon";
import NewsBlack from "../../assets/icons/components/bottomNavigation/NewsBlack";
import MarketIcon from "../../assets/icons/components/bottomNavigation/MarketIcon";
import CommunityIcon from "../../assets/icons/components/bottomNavigation/CommunityIcon";
import CommunityBlack from "../../assets/icons/components/bottomNavigation/CommunityBlack";
import ProfileIcon from "../../assets/icons/components/bottomNavigation/ProfileIcon";
import NewsScreen from "../../screens/newsScreen/newsScreen";
import CommunityScreen from "../../screens/communityScreen/communityScreen";
import ProfileScreen from "../../screens/profileScreen/profileScreen";
import fontFamily from "../../assets/styles/fontFamily";
import HomeScreenStack from "../homeScreenStack/homeScreenStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import InterestsScreen from "../../screens/InterestsScreen/InterestsScreen";
import { IntrestIcon } from "../../assets/icons/components/bottomNavigation";
const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");
const tabsData = [
  {
    name: "HomeStack",
    component: HomeScreenStack,
    Icon: HomeIcon,
    FocusedIcon: HomeBlack,
  },
  {
    name: "News",
    component: NewsScreen,
    Icon: NewsIcon,
    FocusedIcon: NewsBlack,
  },
  {
    name: "Interests",
    component: InterestsScreen,
    Icon: IntrestIcon,
    FocusedIcon: IntrestIcon,
  }, // No focused version provided
  // {
  //   name: "Community",
  //   component: CommunityScreen,
  //   Icon: CommunityIcon,
  //   FocusedIcon: CommunityBlack,
  // },
  {
    name: "Profile",
    component: ProfileScreen,
    Icon: ProfileIcon,
    FocusedIcon: ProfileIcon,
  }, // No focused version provided
];

export default function BottomTabNavigator() {
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
            backgroundColor: isOnHeadlineDetails ? "#E5E4E2" : "#FBFFF1",
            borderTopWidth: 0,
            elevation: 10,
            height: height * 0.09,
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
            tabBarLabel: name,
            tabBarLabelStyle: {
              color: "#000000",
              fontFamily: fontFamily.bottomNavigationText,
            },
            tabBarIcon: ({ focused }) =>
              focused &&
              (name == "HomeStack" || name == "News" || name == "Community") ? (
                <FocusedIcon width={24} height={24} />
              ) : (
                <Icon
                  width={24}
                  height={24}
                  fill={focused ? "#000000" : "transparent"}
                />
              ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
