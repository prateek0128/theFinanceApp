import React, { useEffect, useRef, useState } from "react";
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
import {
  GraphImage,
  IncrementArrow,
  ProfileIcon,
  CurrencyImage,
} from "../../../assets/icons/components/homepage";
import {
  CurrencyImage2,
  GraphImage2,
} from "../../../assets/icons/components/headlineDetailsView";
const { width, height } = Dimensions.get("window");
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [allNewsData, setAllNewsData] = useState([]);
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
  const allNews = [
    {
      id: "6863e623dcb62080ba1a8ae5",
      title: "Reliance Power Stock Hits 7-Year High",
      summary:
        "Shares of Reliance Power surged 8% to ₹62.80, reaching their highest level since January 2018.\nThis significant increase could indicate strong investor confidence and may attract more buyers, potentially boosting the overall market.\nIt's similar to how a popular restaurant's sudden rise in customers can lead to longer wait times and increased interest from new diners.",
      url: "https://www.business-standard.com/markets/news/anil-ambani-reliance-group-stock-hit-7-year-high-zooms-101-from-march-low-125060200374_1.html",
      source: "BusinessStandard",
      published_at: "2025-07-01T13:49:55.587Z",
      categories: null,
      tags: null,
      related_stocks: null,
      impact_score: 5.5,
      impact_label: "Medium Impact",
      sentiment_score: 0.2954545454545454,
      reaction_stats: {
        bullish: 0,
        bearish: 0,
        important: 0,
        neutral: 0,
      },
      engagement: {
        likes: 0,
        comments: 0,
      },
    },
    {
      id: "6863e624dcb62080ba1a8ae6",
      title: "Bharti Hexacom Stock Hits New High",
      summary:
        "The stock price of Bharti Hexacom has surged 58% from its low in April.\nThis significant increase could attract more investors, boosting the company's market value.\nIt's similar to how a popular new restaurant can draw in crowds, increasing its revenue and reputation.",
      url: "https://www.business-standard.com/markets/news/bharti-hexacom-stock-hits-new-high-zooms-58-from-april-low-here-s-why-125060300297_1.html",
      source: "BusinessStandard",
      published_at: "2025-07-01T13:49:55.587Z",
      categories: null,
      tags: null,
      related_stocks: null,
      impact_score: 5,
      impact_label: "Medium Impact",
      sentiment_score: 0.36363636363636365,
      reaction_stats: {
        bullish: 0,
        bearish: 0,
        important: 0,
        neutral: 0,
      },
      engagement: {
        likes: 0,
        comments: 0,
      },
    },
    {
      id: "6863e622dcb62080ba1a8ae3",
      title: "Zen Technologies Soars On Strong Q4 (Fourth Quarter) Results",
      summary:
        "Zen Technologies' share price reached the 5% upper circuit limit due to impressive Q4 (Fourth Quarter) results.\nThis significant increase in profit could attract more investors and boost the company's market position.\nIt's like a student scoring top marks in an exam, which makes them more appealing to colleges.",
      url: "https://www.business-standard.com/markets/news/zen-technologies-hit-5-upper-circuit-on-strong-q4-results-pat-up-189-125051900183_1.html",
      source: "BusinessStandard",
      published_at: "2025-07-01T13:49:55.586Z",
      categories: null,
      tags: null,
      related_stocks: null,
      impact_score: 7,
      impact_label: "High Impact",
      sentiment_score: 0.25,
      reaction_stats: {
        bullish: 0,
        bearish: 0,
        important: 0,
        neutral: 0,
      },
      engagement: {
        likes: 0,
        comments: 0,
      },
    },
  ];

  const getAllNewsAPI = async () => {
    try {
      const response = await getNewsFeed();
      console.log(response.data);
      //setAllNewsData()
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
      {/* <View style={styles.swiperWrapper}>
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
      </View> */}
      <View style={styles.swiperWrapper}>
        {allNews.map((news, index) => {
          return (
            <HeadlineDetailCard
              key={news.id}
              index={index}
              authorName={""}
              timeAgo={""}
              impactLabel={news.impact_label}
              impactScore={news.impact_score}
              heading={news.title}
              summary={news.summary}
              HeadlineImageComponent={GraphImage2}
              ProfileIconComponent={ProfileIcon}
              ImpactIconComponent={IncrementArrow}
              onPress={() =>
                navigation.navigate("HeadlineDetailsScreen", {
                  imageKey: "",
                  title: news.title,
                  author: "news.author",
                  time: "news.time",
                  impactLabel: news.impact_label,
                  impactScore: news.impact_score,
                  points: [],
                  //@ts-ignore
                  discussions: news.discussions,
                })
              }
            />
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
