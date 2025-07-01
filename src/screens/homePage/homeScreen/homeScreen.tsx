import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { colors } from "../../../assets/styles/colors";
import HeadlineDetailCard from "../../../components/headlineDetailedCard/headlineDetailedCard";
import { RootStackParamList } from "../../../types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import fontFamily from "../../../assets/styles/fontFamily";
import axios from "axios";
import { getNewsFeed } from "../../../apiServices/news";
import { cards } from "./homeScreenData";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const articles = [
    {
      title: "RBI holds rates steady, signals caution on inflation",
      author: "Akhil Salunkhe",
      time: "2h ago",
    },
    {
      title: "Tech Stocks surge on positive earnings outlook",
      author: "Shreya Heda",
      time: "4h ago",
    },
  ];

  const getAllNewsAPI = async () => {
    try {
      const response = await getNewsFeed();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllNewsAPI();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Top Headlines</Text>
      </View>
      <View style={styles.articleRow}>
        {articles.map((item, index) => (
          <View key={index} style={styles.articleCard}>
            <View style={styles.articleDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                by {item.author} · {item.time}
              </Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Read Full Article</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.swiperWrapper}>
        {cards.map((card, index) => {
          return (
            <>
              <HeadlineDetailCard
                index={index}
                authorName={card.author}
                timeAgo={card.time}
                impactScore={card.impactScore}
                heading={card.title}
                subHeading={card.subHeading}
                HeadlineImageComponent={card.HeadlineImageComponent}
                ProfileIconComponent={card.ProfileIconComponent}
                ImpactIconComponent={card.ImpactIconComponent}
                onPress={() =>
                  navigation.navigate("HeadlineDetailsScreen", {
                    imageKey: card.imageKey,
                    title: card.title,
                    author: card.author,
                    time: card.time,
                    impactScore: card.impactScore,
                    points: card.points,
                    //@ts-ignore
                    discussions: card.discussions,
                  })
                }
              />
            </>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    //flexGrow: 1,
    backgroundColor: colors.primaryBackground,
  },
  headingContainer: {
    marginTop: 30,
  },
  heading: {
    fontSize: 32,
    fontFamily: fontFamily.titleFont,
    textAlign: "left",
    color: colors.quaternaryText,
  },
  articleRow: {
    marginTop: 32,
    flexDirection: "row",
    gap: 12,
  },
  articleCard: {
    width: width * 0.433,
    //height: 165,
    // marginTop: 62,
    borderRadius: 24,
    borderWidth: 1,
    padding: 12,
    gap: 16,
    backgroundColor: colors.white,
    borderColor: colors.tertiaryBorderColor,
  },
  articleDetails: {
    gap: 8,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.textFont700,
    color: colors.primaryText,
  },
  meta: {
    fontSize: 10,
    fontFamily: fontFamily.textFont500,
    color: colors.tertiaryText,
  },
  button: {
    backgroundColor: colors.quinaryBackground,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  buttonText: {
    color: colors.quinaryText,
    fontFamily: fontFamily.textFont700,
    fontSize: 14,
  },
  swiperWrapper: {
    ///height: CARD_HEIGHT,
    marginTop: 8,
  },
});
