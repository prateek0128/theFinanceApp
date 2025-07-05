import React, { useEffect, useRef, useState, useContext } from "react";
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
import { cards, allNews, allNewsDiscover } from "./homeScreenData";
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
import { ThemeContext } from "../../../context/themeContext";
import DiscoverDetailsCard from "../../../components/discoverDetailsCard/discoverDetailsCard";
import TabLabel from "../../../components/tabLabel/tabLabel";
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
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [allNewsData, setAllNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState("All");

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
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor:
            theme === "dark"
              ? colors.darkPrimaryBackground
              : colors.primaryBackground,
        },
      ]}
    >
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Discover</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabLabelContainer}
      >
        <TabLabel
          label="All"
          selected={selectedTab === "All"}
          onPress={() => setSelectedTab("All")}
        />
        <TabLabel
          label="Stock Market"
          selected={selectedTab === "Stock Market"}
          onPress={() => setSelectedTab("Stock Market")}
        />
        <TabLabel
          label="IPO’s"
          selected={selectedTab === "IPO’s"}
          onPress={() => setSelectedTab("IPO’s")}
        />
        <TabLabel
          label="Crypto"
          selected={selectedTab === "Crypto"}
          onPress={() => setSelectedTab("Crypto")}
        />
        <TabLabel
          label="Mutual Funds"
          selected={selectedTab === "Mutual Funds"}
          onPress={() => setSelectedTab("Mutual Funds")}
        />
      </ScrollView>
      <View style={styles.swiperWrapper}>
        {!loading && allNewsData.length === 0 && (
          <EmptyState message="No data found. Pull to refresh." />
        )}
        {allNewsData.map((news, index) => {
          {
            /* {allNewsDiscover.map((news, index) => { */
          }
          return (
            <DiscoverDetailsCard
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
    backgroundColor: colors.nonaryBackground,
  },
  headingContainer: {
    marginTop: 30,
  },
  heading: {
    fontSize: 32,
    fontFamily: fontFamily.Cabinet700,
    textAlign: "left",
    color: colors.quaternaryText,
  },
  tabLabelContainer: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
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
    fontFamily: fontFamily.Satoshi700,
    fontSize: 14,
  },
  swiperWrapper: {
    // marginTop: 8,
    marginBottom: 20,
  },
});
