import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../homePage/homePage";
import Icon from "react-native-vector-icons/Ionicons";
import HomeIcon from "../../assets/icons/components/bottomNavigation/HomeIcon";
import CommunityIcon from "../../assets/icons/components/bottomNavigation/CommunityIcon";
import NewsIcon from "../../assets/icons/components/bottomNavigation/NewsIcon";
import MarketIcon from "../../assets/icons/components/bottomNavigation/MarketIcon";
import ProfileIcon from "../../assets/icons/components/bottomNavigation/ProfileIcon";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#F3EDF7", // 👈 Change this to your desired color
          borderTopWidth: 0, // optional: remove top border
          elevation: 10, // optional: shadow on Android
        },
        tabBarIcon: ({ color, focused }) => {
          switch (route.name) {
            case "Home":
              return (
                <HomeIcon
                  width={24}
                  height={24}
                  fill={focused ? "#000" : "gray"}
                />
              );
            case "News":
              return (
                <NewsIcon
                  width={24}
                  height={24}
                  //   fill={focused ? "#007AFF" : "gray"}
                />
              );
            case "Market":
              return (
                <MarketIcon
                  width={24}
                  height={24}
                  //   fill={focused ? "#007AFF" : "gray"}
                />
              );
            case "Community":
              return (
                <CommunityIcon
                  width={24}
                  height={24}
                  //   fill={focused ? "#007AFF" : "gray"}
                />
              );

            case "Profile":
              return (
                <ProfileIcon
                  width={24}
                  height={24}
                  //   fill={focused ? "#007AFF" : "gray"}
                />
              );
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="News" component={HomeScreen} />
      <Tab.Screen name="Market" component={HomeScreen} />
      <Tab.Screen name="Community" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}
