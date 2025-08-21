import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { BackHandler, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
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
import { getUserProfile } from "../../../apiServices/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [userName, setUserName] = useState("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
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
  const profile = {
    created_at: "2025-07-31T12:24:03.247Z",
    device_token: "",
    device_type: "",
    email: "rajput.prateek28@gmail.com",
    id: "688b6063744fe82c289f5561",
    interests: ["Startups", "Mutual Funds", "Crypto", "Economy"],
    name: "New User",
    notification__settings: {
      enable_market_summaries: false,
      enable_news_alerts: false,
      enable_price_alerts: false,
    },
    onboarding_completed: true,
    phone: "",
    preferred_index: "",
  };
  const getAllNewsAPI = async (
    selectedTag: string,
    page: number,
    append = false,
    limit?: number,
    isRefresh = false
  ) => {
    if (!isRefresh && !append) {
      setLoading(true); // show loader only on first load
    }
    try {
      const response = await getHighImpactNews(selectedTag, limit ?? 10);
      //const newsData = response.data;
      const newsData = response.data.data;
      console.log("newsResponse:", newsData);
      setAllNewsData(newsData);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
    } finally {
      if (!isRefresh) setLoading(false);
      setRefreshing(false); // always stop refresh spinner
    }
  };
  const getUserProfileAPI = async () => {
    try {
      const response = await getUserProfile();
      console.log("ProfileResponse=>", response.data);
      const profileData = response.data;
      console.log("userName=>", profileData.name);
      console.log("userEmail=>", profileData.email);
      AsyncStorage.multiSet([
        ["userId", profileData.id || ""],
        ["userName", profileData.name || ""],
        ["userEmail", profileData.email || ""],
        ["userPhone", profileData.phone || ""],
        ["userInterests", JSON.stringify(profileData.interests || [])],
      ]);
      setUserName(profileData.name || "");
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
    }
  };
  useEffect(() => {
    if (selectedTag !== "") {
      setPage(1);
      getAllNewsAPI(selectedTag, 1);
    }
    getUserProfileAPI();
  }, [selectedTag]);
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    getAllNewsAPI(selectedTag, 1, false, 10, true); // pass isRefresh=true
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getAllNewsAPI(selectedTag, nextPage, true);
  };

  // Inside your HomeScreen component
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Optional: Ask for confirmation before exiting
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default behavior (going back in navigation)
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );
  if (loading && !refreshing) return <Loader />;
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
              Hello {userName || "--"},
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
      <FlatList
        data={allNewsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <React.Fragment key={item.id}>
            <DiscoverDetailsCard
              index={index}
              authorName={item?.authors?.[0] ?? "--"}
              timeAgo={item?.time_ago ?? "--"}
              impactLabel={item?.impact_label ?? ""}
              impactScore={
                item?.impact_score != null
                  ? item.impact_score.toFixed(2)
                  : "0.00"
              }
              likes={item?.engagement?.likes ?? 0}
              comments={item?.engagement?.comments ?? 0}
              tag={item?.tag ?? ""}
              heading={item?.title ?? ""}
              summary={item?.summary ?? ""}
              HeadlineImageComponent={GraphImage2}
              ProfileIconComponent={ProfileIcon}
              onPress={() =>
                navigation.navigate("HeadlineDetailsScreen", {
                  newsId: item?.id ?? "",
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
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !loading ? (
            <EmptyState message="No data found. Pull to refresh." />
          ) : null
        }
      />
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
