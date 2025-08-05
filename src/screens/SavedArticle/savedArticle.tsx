import React from "react";
import { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { BackArrow, BackArrowWhite } from "../../assets/icons/components/logIn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have expo vector icons installed
import fontFamily from "../../assets/styles/fontFamily";
import { ThemeContext } from "../../context/themeContext";
import { colors } from "../../assets/styles/colors";
import { Divider } from "react-native-paper";
import globalStyles from "../../assets/styles/globalStyles";

const savedArticles = [
  {
    id: "1",
    source: "Moneycontrol",
    title: "RBI’s rate pause : Impact on Lending Rates",
    time: "17 hours ago",
    image: require("../../assets/Images/Image1.png"),
  },
  {
    id: "2",
    source: "Moneycontrol",
    title: "Reliance Industries Q3 Results Beat Estimates, St...",
    time: "17 hours ago",
    image: require("../../assets/Images/Image.png"),
  },
  {
    id: "3",
    source: "Fstoppers",
    title: "RBI’s rate pause : Impact on Lending Rates",
    time: "18 hours ago",
    image: require("../../assets/Images/Image2.png"),
  },
  {
    id: "4",
    source: "Moneycontrol",
    title: "RBI’s rate pause : Impact on Lending Rates",
    time: "17 hours ago",
    image: require("../../assets/Images/Image1.png"),
  },
  {
    id: "5",
    source: "Moneycontrol",
    title: "Reliance Industries Q3 Results Beat Estimates, St...",
    time: "17 hours ago",
    image: require("../../assets/Images/Image.png"),
  },
  {
    id: "6",
    source: "Fstoppers",
    title: "RBI’s rate pause : Impact on Lending Rates",
    time: "18 hours ago",
    image: require("../../assets/Images/Image2.png"),
  },
];

const SavedArticles = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          borderColor:
            theme === "dark"
              ? colors.darkUndenaryBackground
              : colors.darkUndenaryBackground,
        },
      ]}
    >
      <View style={[styles.textContent]}>
        <View style={styles.sourceContainer}>
          <Image
            source={require("../../assets/Images/Ellipse.png")} // use a different icon if needed
            style={styles.sourceIcon}
          />
          <Text
            style={[
              styles.source,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
            ]}
          >
            {item.source}
          </Text>
        </View>
        <Text
          style={[
            styles.title,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.time,
            {
              color:
                theme === "dark"
                  ? colors.darkSenaryText
                  : colors.unvigintaryText,
            },
          ]}
        >
          {item.time}
        </Text>
      </View>
      <Image source={item.image} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[globalStyles.pageContainerWithBackground(theme)]}>
      <View style={styles.headerContainer}>
        <View style={styles.arrowSavedContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
          >
            {theme === "dark" ? <BackArrowWhite /> : <BackArrow />}
          </TouchableOpacity>
          <Text
            style={[
              styles.header,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
            ]}
          >
            Saved Articles
          </Text>
        </View>
      </View>
      <Divider
        style={[
          styles.dividerStyle,
          {
            backgroundColor:
              theme === "light"
                ? colors.octodenaryBackground
                : colors.darkUndenaryBackground,
          },
        ]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }} // Optional spacing at bottom
      >
        {savedArticles.map((item, index) => (
          <View key={item.id} style={[{}]}>
            {renderItem({ item })}
            {/* Add divider after each item except the last one */}
            {index !== savedArticles.length - 1 && (
              <Divider
                style={[
                  styles.dividerStyle,
                  {
                    backgroundColor:
                      theme === "light"
                        ? colors.octodenaryBackground
                        : colors.darkUndenaryBackground,
                  },
                ]}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedArticles;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column", // stack vertically
    alignItems: "flex-start", // align everything to the left
    marginTop: 30,
    marginBottom: 20,
  },

  header: {
    fontSize: 32,
    fontFamily: fontFamily.Inter700,
    gap: 16,
  },
  arrowSavedContainer: { gap: 16 },
  backButton: {},
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  sourceIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    gap: 3,
  },
  dividerStyle: {
    height: 1,
    marginVertical: 24,
  },

  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    gap: 24,
  },

  textContent: {
    flex: 1,
    marginRight: 10,
  },
  source: {
    fontSize: 13,
    color: "#888",
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  time: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 6,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
});
