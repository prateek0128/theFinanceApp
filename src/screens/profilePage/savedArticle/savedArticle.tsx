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
import {
  BackArrow,
  BackArrowWhite,
} from "../../../assets/icons/components/logIn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have expo vector icons installed
import fontFamily from "../../../assets/styles/fontFamily";
import { ThemeContext } from "../../../context/themeContext";
import { colors } from "../../../assets/styles/colors";
import { Divider } from "react-native-paper";
import globalStyles from "../../../assets/styles/globalStyles";
import { NewsAuthorIcon } from "../../../assets/icons/components/homepage";
import {
  ViewMoreIcon,
  ViewMoreIconWhite,
} from "../../../assets/icons/components/savedArticles";
import Header from "../../../components/header/header";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";

const savedArticles = [
  {
    id: "1",
    source: "Moneycontrol",
    title: "RBI’s rate pause : Impact on Lending Rates",
    time: "17 hours ago",
    image: require("../../../assets/images/Image1.png"),
  },
  {
    id: "2",
    source: "Moneycontrol",
    title: "Reliance Industries Q3 Results Beat Estimates, St...",
    time: "17 hours ago",
    image: require("../../../assets/images/Image.png"),
  },
  {
    id: "3",
    source: "Fstoppers",
    title: "RBI’s rate pause : Impact on Lending Rates",
    time: "18 hours ago",
    image: require("../../../assets/images/Image2.png"),
  },
  {
    id: "4",
    source: "Moneycontrol",
    title: "RBI’s rate pause : Impact on Lending Rates",
    time: "17 hours ago",
    image: require("../../../assets/images/Image1.png"),
  },
  {
    id: "5",
    source: "Moneycontrol",
    title: "Reliance Industries Q3 Results Beat Estimates, St...",
    time: "17 hours ago",
    image: require("../../../assets/images/Image.png"),
  },
  {
    id: "6",
    source: "Fstoppers",
    title: "RBI’s rate pause : Impact on Lending Rates",
    time: "18 hours ago",
    image: require("../../../assets/images/Image2.png"),
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
      <View style={[styles.savedArticleDetails]}>
        <View style={[styles.detailsContainer]}>
          <View style={styles.authorIconContainer}>
            <NewsAuthorIcon />
            <View style={styles.authorTimeContainer}>
              <Text
                style={[
                  styles.authorText,
                  {
                    color:
                      theme === "light" ? colors.octodenaryText : colors.white,
                  },
                ]}
              >
                {item.source || "--"}
              </Text>
            </View>
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
        </View>
        <View style={[styles.imageContainer]}>
          <Image
            source={item.image}
            style={styles.image}
            width={100}
            height={100}
          />
        </View>
      </View>
      <View style={[styles.cardBottomSection]}>
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
        {theme == "light" ? <ViewMoreIcon /> : <ViewMoreIconWhite />}
      </View>
    </TouchableOpacity>
  );
  useBackPressNavigate("Home");
  return (
    <SafeAreaView style={[globalStyles.pageContainerWithBackground(theme)]}>
      <View style={styles.headerContainer}>
        <View style={styles.arrowSavedContainer}>
          <Header
            onBackClick={() => {
              navigation.navigate("Profile", {
                screen: "ProfileStack",
              });
            }}
            showThemeIcon={true}
          />
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
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 30,
    width: "100%",
  },

  header: {
    fontSize: 32,
    fontFamily: fontFamily.Inter700,
  },
  arrowSavedContainer: { gap: 16, width: "100%" },
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
    gap: 16,
  },
  savedArticleDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  detailsContainer: { gap: 16, width: "65%" },
  imageContainer: {},
  title: {
    fontSize: 18,
    fontFamily: fontFamily.Inter700,
    flexShrink: 1,
  },
  time: {
    fontSize: 12,
    fontFamily: fontFamily.Inter400,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  authorIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  authorTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  authorText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 14,
  },
  cardBottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
});
