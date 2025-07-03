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
import EmptyState from "../../../components/EmptyStatte/emptyState";
import HeadlineDetailCard from "../../../components/headlineDetailedCard/headlineDetailedCard";
import { RootStackParamList } from "../../../types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import fontFamily from "../../../assets/styles/fontFamily";
import axios from "axios";
import { getNewsFeed } from "../../../apiServices/news";
import Loader from "../../../components/Loader/loader";
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
type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  published_at: string;
  categories: any;
  tags: any;
  related_stocks: any;
  impact_score: number;
  impact_label: string;
  sentiment_score: number;
  reaction_stats: {
    bullish: number;
    bearish: number;
    important: number;
    neutral: number;
  };
  engagement: {
    likes: number;
    comments: number;
  };
  discussions?: any;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [allNewsData, setAllNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      console.log("newsResponse:", response.data);
      setAllNewsData(response.data);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllNewsAPI();
  }, []);
  if (loading) return <Loader />;
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
        {!loading && allNewsData.length === 0 && (
          <EmptyState message="No data found. Pull to refresh." />
        )}
        {allNewsData.map((news, index) => {
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
                  newsId: news.id,
                  imageKey: "",
                  title: news.title,
                  author: "",
                  time: "",
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
