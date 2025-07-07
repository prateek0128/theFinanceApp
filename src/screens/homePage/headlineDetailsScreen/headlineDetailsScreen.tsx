import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "../../../assets/styles/colors";
import Loader from "../../../components/Loader/loader";
import { ThemeContext } from "../../../context/themeContext";
import { getNewsFeed } from "../../../apiServices/news";
import LoaderOverlay from "../../../components/LoadOverlay/loadOverlayTransparent";
import MarketTag from "../../../assets/icons/components/Market/marketTag";
import {
  CurrencyImage,
  GraphImage,
  IncrementArrow,
  ProfileIcon,
} from "../../../assets/icons/components/homepage";
import {
  GraphImage2,
  FemaleProfileIcon,
  MaleProfileIcon,
  LikeCommentIcon,
  UnlikeCommentIcon,
  CommentIcon,
  CommentIconBlack,
  CurrencyImage2,
} from "../../../assets/icons/components/headlineDetailsView";
import HeadlineDetailCard from "../../../components/headlineDetailedCard/headlineDetailedCard";
import Tag from "../../../components/tag/tag";
import { RootStackParamList } from "../../../types/navigation";
import {
  useNavigation,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import fontFamily from "../../../assets/styles/fontFamily";
import { TextInput } from "react-native-gesture-handler";
import Header from "../../../components/header/header";
import ClippedSVG from "../../../components/clippedSVG/clippedSVG";
import {
  addComments,
  addReaction,
  checkLikeStatus,
  checkUserLikeStatus,
  getComments,
  toggleLike,
} from "../../../apiServices/newsEngagement";
import { getNewsByID } from "../../../apiServices/news";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  getPinnedNews,
  pinNews,
  unpinNews,
} from "../../../apiServices/newsManagement";
import ImpactLabel from "../../../components/impactLabel/impactLabel";

dayjs.extend(relativeTime);
const { width, height } = Dimensions.get("window");

type HeadlineDetailsRouteProp = RouteProp<
  RootStackParamList,
  "HeadlineDetailsScreen"
>;

const imageMap: Record<
  string,
  React.ComponentType<{ width?: number; height?: number }>
> = {
  graph: GraphImage2,
  currency: CurrencyImage2,
};
interface NewsData {
  title?: string;
  impact_label?: string;
  impact_score?: number;
  summary?: string;
  url?: string;
}
const HeadlineDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<HeadlineDetailsRouteProp>();
  const {
    newsId,
    title,
    author,
    time,
    impactLabel,
    impactScore,
    points,
    discussions,
    imageKey,
  } = route.params || {};
  const [market, setMarket] = useState("");
  const [bearish, setBearish] = useState("");
  const [comment, setComment] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [commentsData, setCommentsData] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newsData, setNewsData] = useState<NewsData>({});
  // const [allNewsData, setAllNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addCommentsLoader, setAddcommentsLoader] = useState<boolean>(false);
  const renderImage = () => {
    if (typeof imageKey === "string" && imageKey in imageMap) {
      const ImageComponent = imageMap[imageKey];
      return (
        ImageComponent && (
          <ClippedSVG
            width={width * 0.89}
            height={200}
            radius={16}
            ImageComponent={ImageComponent}
          />
        )
      );
    }
    return null;
  };
  const newsData2 = {
    categories: null,
    engagement: { comments: 0, likes: 0 },
    id: "6864d77687eec4ab944144f6",
    impact_label: "Significant Impact",
    impact_score: 6.5,
    published_at: "2025-07-02T07:28:59.209Z",
    reaction_stats: { bearish: 0, bullish: 0, important: 0, neutral: 0 },
    related_stocks: null,
    sentiment_score: 0.3181818181818181,
    source: "MoneyControl",
    summary:
      "Emkay Global predicts a 22% increase in HDB Financial Services' share price based on its strong fundamentals. This positive outlook could lead to increased investor interest and higher stock prices in the financial sector. Its like finding a promising new restaurant that everyone wants to try, boosting its popularity and sales.",
    tags: null,
    title: "HDB Financial Shares Expected to Surge",
    url: "https://www.moneycontrol.com/news/business/markets/emkay-global-sees-22-upside-for-hdb-financial-shares-from-ipo-s-upper-price-band-13216416.html",
  };
  const comments = [
    {
      comment: "Impressive news",
      commented_at: "2025-07-02T11:02:27Z",
      id: "686511c313b9bfbabd948fc0",
      likes: 0,
      news_id: "6864f165e47cdd0e79348df6",
      user_id: "6864f3be13b9bfbabd948fb6",
    },
    {
      comment: "News is good.",
      commented_at: "2025-07-02T11:01:52Z",
      id: "686511a013b9bfbabd948fbf",
      likes: 0,
      news_id: "6864f165e47cdd0e79348df6",
      user_id: "6864f3be13b9bfbabd948fb6",
    },
  ];
  useEffect(() => {
    if (newsId) {
      getCommentsAPI(newsId);
      getNewsByIDAPI(newsId);
      checkUserLikeStatusAPI(newsId);
      checkLikeStatusAPI(newsId);
    }
    getBookmarkAPI();
  }, [newsId]);

  const addReactionAPI = async (newsId: any) => {
    try {
      const response = await addReaction(newsId);
      console.log(response.data);
    } catch (error) {
      console.log("API Error:", error);
    }
  };
  const handleToggleLike = () => {
    setLiked((prev) => !prev);
    if (newsId) {
      toggleLikeAPI(newsId);
    }
  };
  const toggleLikeAPI = async (newsId: any) => {
    try {
      const response = await toggleLike(newsId);
      console.log("Toggle Like=>", response.data);
    } catch (error) {
      console.log("API Error:", error);
    }
  };
  const getBookmarkAPI = async () => {
    try {
      const response = await getPinnedNews();
      console.log("getBookmarkResponse", response.data);
      setBookmarked(response.data);
    } catch (error) {
      console.log("API Error:", error);
    }
  };
  const handleToggleBookmark = () => {
    setBookmarked((prev) => {
      const newStatus = !prev;
      if (newsId) {
        if (newStatus) {
          handlePinNews(newsId);
        } else {
          handleUnPinNews(newsId);
        }
      }
      return newStatus;
    });
  };

  const handlePinNews = async (newsId: string) => {
    try {
      const response = await pinNews(newsId);
      console.log("PinNews=>", response.data);
    } catch (e) {
      console.log("API Error:", e);
    }
  };
  const handleUnPinNews = async (newsId: string) => {
    try {
      const response = await unpinNews(newsId);
      console.log("UninNews=>", response.data);
    } catch (e) {
      console.log("API Error:", e);
    }
  };
  const checkLikeStatusAPI = async (newsId: string) => {
    try {
      const response = await checkLikeStatus(newsId);
      console.log("CheckLikeStatusAPI", response.data);
    } catch (error) {
      console.log("API Error:", error);
    }
  };
  const addCommentsAPI = async (newsId: any) => {
    setAddcommentsLoader(true);
    const commentData = {
      comment: comment,
    };
    try {
      const response = await addComments(newsId, commentData);
      console.log(response.data);
      setComment("");
      getCommentsAPI(newsId);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setAddcommentsLoader(false);
    }
  };
  // const deleteCommentsAPI = async () => {
  //   try {
  //     const response = await deleteComments();
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log("API Error:", error);
  //   }
  // }
  const checkUserLikeStatusAPI = async (newsId: string) => {
    try {
      const response = await checkUserLikeStatus(newsId);
      console.log("CheckUserLikeStatus=>", response.data.liked);
      setLiked(response.data.liked);
    } catch (error) {
      console.log("API Error:", error);
    }
  };
  const getNewsByIDAPI = async (newsId: string) => {
    try {
      const response = await getNewsByID(newsId);
      console.log("newsResponseByID:", response.data);
      setNewsData(response.data);
    } catch (e) {
      console.log("API Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const getCommentsAPI = async (newsId: string) => {
    try {
      const response = await getComments(newsId);
      console.log("Comments", response.data);
      setCommentsData(response.data);
    } catch (error) {
      console.log("API Error:", error);
    }
  };
  const getProfileIcon = (type: "male" | "female") => {
    return type === "female" ? (
      <FemaleProfileIcon width={40} height={40} />
    ) : (
      <MaleProfileIcon width={40} height={40} />
    );
  };
  const getShortTimeAgo = (dateString: any) => {
    const now = dayjs();
    const past = dayjs(dateString);
    const diffInMinutes = now.diff(past, "minute");
    const diffInHours = now.diff(past, "hour");
    const diffInDays = now.diff(past, "day");

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      return `${diffInDays}d`;
    }
  };
  if (loading) return <Loader />;
  if (addCommentsLoader) return <LoaderOverlay visible={true} />;

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        //keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // tweak this if needed
      >
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
          <View style={styles.headerContainer}>
            <Header
              onBackClick={() => navigation.navigate("Home")}
              liked={liked}
              setLiked={setLiked}
              bookmarked={bookmarked}
              setBookmarked={setBookmarked}
              onToggleLikeClick={handleToggleLike}
              shareUrl={newsData.url}
              onToggleBookmarkClick={handleToggleBookmark}
            />
          </View>
          <View style={styles.headingDetailsContainer}>
            <View
              style={{
                width: "100%",
                marginTop: 16,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* {renderImage()} */}
              <ClippedSVG
                width={width * 0.89}
                height={200}
                radius={16}
                ImageComponent={CurrencyImage2}
              />
            </View>
            <View style={styles.headingContainer}>
              <Text
                style={[
                  styles.articleDetailsHeading,
                  {
                    color:
                      theme === "dark"
                        ? colors.darkPrimaryText
                        : colors.primaryText,
                  },
                ]}
              >
                {newsData.title}
              </Text>
              <View style={styles.detailsHeader}>
                <View style={styles.tagContainer}>
                  <Tag
                    label={"Market"}
                    backgroundColor={"#D1FAE5"}
                    textColor={"#047852"}
                  />
                  <Tag
                    label={"Bearish"}
                    backgroundColor={"#FEE2E2"}
                    textColor={"#DC2626"}
                  />
                </View>

                <View style={styles.profileNameContainer}>
                  {/* <IncrementArrow width={16} height={16} /> */}
                  {/* <View style={styles.impactLabel}>
                    <Text style={styles.impactLabelText}>
                      {newsData.impact_label} : {newsData.impact_score}
                    </Text>
                  </View> */}
                  <ImpactLabel
                    variant={"contained"}
                    label={newsData.impact_label}
                    value={newsData.impact_score}
                    backgroundColor={colors.quindenaryBackground}
                    textColor={colors.quattuordenaryBackground}
                  />
                </View>
              </View>
            </View>

            <View style={styles.headingDetails}>
              {/* {points?.map((point, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.listIndex}>{index + 1}.</Text>
                  <Text style={styles.listPoints}>{point}</Text>
                </View>
              ))} */}
              <View style={styles.listItem}>
                <Text style={styles.listIndex}>{1}.</Text>
                <Text
                  style={[
                    styles.listPoints,
                    {
                      color:
                        theme === "dark"
                          ? colors.darkPrimaryText
                          : colors.primaryText,
                    },
                  ]}
                >
                  {newsData.summary}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.relatedDiscussionsContainer}>
            <Text
              style={[
                styles.relatedDiscussionsHeading,
                {
                  color:
                    theme === "dark"
                      ? colors.darkPrimaryText
                      : colors.primaryText,
                },
              ]}
            >
              Related Discussions
            </Text>
            <View style={styles.relatedDiscussionsDetails}>
              {Array.isArray(comments) &&
                comments.map((comment) => (
                  <View
                    key={comment.id}
                    style={styles.relatedDiscussionsArticle}
                  >
                    {
                      //@ts-ignore
                      getProfileIcon("male")
                    }
                    <View style={{ flex: 1 }}>
                      <View style={styles.relatedDiscussionsArticle}>
                        <Text
                          style={[
                            styles.authorName,
                            {
                              color:
                                theme === "dark"
                                  ? colors.darkPrimaryText
                                  : colors.senaryText,
                            },
                          ]}
                        >
                          {"--"}
                        </Text>
                        <Text style={styles.articleTime}>
                          {getShortTimeAgo(comment.commented_at)}
                        </Text>
                      </View>
                      <Text style={styles.relatedArticleText}>
                        {comment.comment}
                      </Text>
                      <View style={styles.likeUnlikeContainer}>
                        <View style={styles.iconCountContainer}>
                          <TouchableOpacity>
                            <LikeCommentIcon width={20} height={20} />
                          </TouchableOpacity>
                          <Text style={styles.articleTime}>
                            {comment.likes}
                          </Text>
                        </View>
                        <View style={styles.iconCountContainer}>
                          <TouchableOpacity>
                            <UnlikeCommentIcon width={20} height={20} />
                          </TouchableOpacity>
                          <Text style={styles.articleTime}>{0}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </View>
          <View
            style={[
              styles.commentContainer,
              // {
              //   backgroundColor:
              //     theme === "dark"
              //       ? colors.darkPrimaryBackground
              //       : colors.primaryBackground,
              // },
            ]}
          >
            <TextInput
              style={[
                styles.commentInput,
                {
                  backgroundColor:
                    theme === "dark"
                      ? colors.darkPrimaryBackground
                      : colors.primaryBackground,

                  color:
                    theme === "dark"
                      ? colors.darkPrimaryText
                      : colors.undenaryBackground,

                  borderColor:
                    theme === "dark"
                      ? colors.quaternaryBorderColor
                      : colors.tertiaryBorderColor,
                },
              ]}
              placeholder="Write a comment..."
              placeholderTextColor={
                theme == "dark"
                  ? colors.tertiaryText
                  : colors.primaryBorderColor
              }
              keyboardType="email-address"
              value={comment}
              onChangeText={(text) => {
                setComment(text);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                addCommentsAPI(newsId);
              }}
            >
              <View
                style={[
                  styles.commentButton,
                  {
                    backgroundColor:
                      theme === "dark"
                        ? colors.duodenaryBackground
                        : colors.undenaryBackground,
                  },
                ]}
              >
                {theme === "light" ? <CommentIcon /> : <CommentIconBlack />}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default HeadlineDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: colors.nonaryBackground,
  },
  headerContainer: {
    marginTop: 24,
  },
  headingDetailsContainer: {
    gap: 32,
  },
  headingContainer: {
    gap: 16,
  },

  bearishTagContainer: {
    backgroundColor: "##FEE2E2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    alignSelf: "flex-start",
    gap: 8,
  },
  bearishTagText: {
    color: "##DC2626",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: fontFamily.Satoshi500,
  },
  headingDetails: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  listIndex: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.tertiaryText,
  },
  articleDetailsHeading: {
    fontFamily: fontFamily.Cabinet700,
    fontSize: 32,
    color: colors.primaryText,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagContainer: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  profileNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileName: {
    flexDirection: "column",
    justifyContent: "center",
  },
  headingName: {
    fontFamily: fontFamily.Cabinet700,
    fontSize: 12,
    color: colors.primaryText,
  },
  meta: {
    fontSize: 8,
    fontFamily: fontFamily.Satoshi500,
    color: colors.tertiaryText,
  },

  impactLabel: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.senaryBackground,
  },
  impactLabelText: {
    fontSize: 12,
    fontFamily: fontFamily.Satoshi500,
    color: colors.quaternaryText,
  },
  listPoints: {
    fontSize: 16,
    fontFamily: fontFamily.Satoshi500,
    color: colors.tertiaryText,
  },
  relatedDiscussionsContainer: {
    marginTop: 32,
    gap: 28,
  },
  relatedDiscussionsHeading: {
    fontFamily: fontFamily.Cabinet700,
    fontSize: 20,
    color: colors.senaryText,
  },
  relatedDiscussionsDetails: {
    gap: 20,
  },
  relatedDiscussionsArticle: {
    flexDirection: "row",
    gap: 12,
  },
  authorName: {
    fontFamily: fontFamily.Cabinet700,
    fontSize: 16,
    color: colors.senaryText,
  },
  articleTime: {
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
    color: colors.septenaryText,
  },
  relatedArticleText: {
    fontSize: 14,
    fontFamily: fontFamily.Satoshi400,
    color: colors.tertiaryText,
  },
  likeUnlikeContainer: {
    flexDirection: "row",
    paddingTop: 8,
    gap: 36,
  },
  iconCountContainer: {
    flexDirection: "row",
    gap: 8,
  },
  commentContainer: {
    paddingHorizontal: 12,
    marginTop: 32,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    gap: 16,
  },
  commentInput: {
    width: "85%",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderColor: colors.tertiaryBorderColor,
    fontFamily: fontFamily.Satoshi500,
    fontSize: 16,
    height: 48,
  },
  commentButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: colors.primaryText,
  },
});
