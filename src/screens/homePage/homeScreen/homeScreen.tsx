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
import axios, { AxiosError } from "axios";
import { getHighImpactNews, getNewsFeed } from "../../../apiServices/news";
import Loader from "../../../components/Loader/loader";
import { ProfileIcon } from "../../../assets/icons/components/homepage";
import { GraphImage2 } from "../../../assets/icons/components/headlineDetailsView";
import { ThemeContext } from "../../../context/themeContext";
import DiscoverDetailsCard from "../../../components/discoverDetailsCard/discoverDetailsCard";
import TabLabel from "../../../components/tabLabel/tabLabel";
import showToast from "../../../utilis/showToast";
import globalStyles from "../../../assets/styles/globalStyles";
import { Divider } from "react-native-paper";
import { data } from "./homeScreenData"; // Importing the data from homeScreenData.ts
const { width, height } = Dimensions.get("window");
type NewsItem = {
  id: string;
  authors: string;
  time_ago: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  published_at: string;
  categories: any;
  tags: any;
  tag: string;
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
  const [selectedTag, setSelectedTag] = useState("All");

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

  const getAllNewsAPI = async (selectedTag: string) => {
    setLoading(true);
    try {
      const response = await getHighImpactNews(selectedTag);
      //const newsData = response.data;
      const newsData = response.data.data;
      //console.log("newsResponse:", newsData);
      setAllNewsData(newsData);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedTag !== "") {
      getAllNewsAPI(selectedTag);
    }
  }, [selectedTag]);
  if (loading) return <Loader />;
  return (
    <View style={[globalStyles.pageContainerWithBackground(theme)]}>
      <View style={styles.headingContainer}>
        <View style={styles.headingThemeContainer}>
          <View style={styles.userHeadingContainer}>
            <Text
              style={[
                styles.userNameStyle,
                {
                  color:
                    theme == "light"
                      ? colors.novemdenaryText
                      : colors.darkSenaryText,
                },
              ]}
            >
              Hello User,
            </Text>
            <Text
              style={[
                globalStyles.title(theme),
                { textAlign: "left", marginBottom: 0 },
              ]}
            >
              Top Headlines
            </Text>
          </View>
          <TouchableOpacity onPress={toggleTheme}>
            <Text style={styles.text}>{theme === "dark" ? "☀️" : "🌙"}</Text>
          </TouchableOpacity>
        </View>
        <Divider
          style={[
            styles.dividerStyle,
            {
              backgroundColor:
                theme == "light"
                  ? colors.octodenaryBackground
                  : colors.darkUndenaryBackground,
            },
          ]}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabLabelContainer}
        >
          <TabLabel
            label="All"
            selected={selectedTag === "All"}
            onPress={() => setSelectedTag("All")}
          />
          <TabLabel
            label="Stock Market"
            selected={selectedTag === "Stock Market"}
            onPress={() => setSelectedTag("Stock Market")}
          />
          <TabLabel
            label="IPO’s"
            selected={selectedTag === "IPO’s"}
            onPress={() => setSelectedTag("IPO’s")}
          />
          <TabLabel
            label="Crypto"
            selected={selectedTag === "Crypto"}
            onPress={() => setSelectedTag("Crypto")}
          />
          <TabLabel
            label="Mutual Funds"
            selected={selectedTag === "Mutual Funds"}
            onPress={() => setSelectedTag("Mutual Funds")}
          />
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.swiperWrapper}>
          {!loading && allNewsData.length === 0 && (
            <EmptyState message="No data found. Pull to refresh." />
          )}
          {allNewsData.map((news, index) => {
            {
              /* {data.map((news, index) => { */
            }
            return (
              <React.Fragment key={news.id}>
                <DiscoverDetailsCard
                  key={news.id}
                  index={index}
                  authorName={news.authors[0]}
                  timeAgo={news.time_ago}
                  impactLabel={news.impact_label}
                  impactScore={news.impact_score.toFixed(2)}
                  likes={news.engagement.likes}
                  comments={news.engagement.comments}
                  tag={news.tag}
                  heading={news.title}
                  summary={news.summary}
                  HeadlineImageComponent={GraphImage2}
                  ProfileIconComponent={ProfileIcon}
                  onPress={() =>
                    navigation.navigate("HeadlineDetailsScreen", {
                      newsId: news.id,
                      imageKey: "",
                    })
                  }
                />
                <Divider
                  style={[
                    styles.dividerStyle,
                    {
                      backgroundColor:
                        theme == "light"
                          ? colors.octodenaryBackground
                          : colors.darkUndenaryBackground,
                    },
                  ]}
                />
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    //flexGrow: 1,
    backgroundColor: colors.nonaryBackground,
  },
  headingContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  headingThemeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userHeadingContainer: {
    gap: 0,
  },
  userNameStyle: {
    fontSize: 16,
    fontFamily: fontFamily.Inter500,
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
    //marginTop: 12,
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
    //marginTop: 40,
    marginBottom: 20,
  },
  dividerStyle: {
    height: 1,
    // backgroundColor: colors.nonaryBorder,
    marginVertical: 24,
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
});
