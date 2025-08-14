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
  Keyboard,
} from "react-native";
import { colors } from "../../../assets/styles/colors";
import Loader from "../../../components/Loader/loader";
import { ThemeContext } from "../../../context/themeContext";
import { getHighImpactNewsById, getNewsFeed } from "../../../apiServices/news";
import LoaderOverlay from "../../../components/LoadOverlay/loadOverlayTransparent";
import {
  FemaleProfileIcon,
  MaleProfileIcon,
  LikeCommentIcon,
  LikeCommentIconFilled,
  UnlikeCommentIcon,
  UnlikeCommentIconFilled,
  CommentIcon,
  CommentIconBlack,
  CurrencyImage2,
  HeartCommentIcon,
  HeartCommentIconFilled,
} from "../../../assets/icons/components/headlineDetailsView";
import HeadlineDetailCard from "../../../components/headlineDetailedCard/headlineDetailedCard";
import Tag from "../../../components/tag/tag";
import { RootStackParamList } from "../../../types/navigation";
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import fontFamily from "../../../assets/styles/fontFamily";
import { TextInput } from "react-native-gesture-handler";
import Header from "../../../components/header/header";
import ClippedSVG from "../../../components/clippedSVG/clippedSVG";
import {
  addComments,
  addReaction,
  checkLikeStatus,
  checkUserLikeNewsStatus,
  getComments,
  toggleLike,
  toggleLikeComments,
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
import showToast from "../../../utilis/showToast";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "../../../assets/styles/globalStyles";
import { NewsAuthorIcon } from "../../../assets/icons/components/homepage";
import { Divider } from "react-native-paper";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";

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
  currency: CurrencyImage2,
};
interface NewsData {
  title?: string;
  impact_label?: string;
  impact_score?: number;
  summary?: string;
  url?: string;
  tag?: string;
  authors?: string;
  time_ago?: string;
}
const HeadlineDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<HeadlineDetailsRouteProp>();
  const { newsId, imageKey } = route.params || {};
  console.log("NewsId=>", newsId);
  const [comment, setComment] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [commentsData, setCommentsData] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newsData, setNewsData] = useState<NewsData>({});
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [addCommentsLoader, setAddCommentsLoader] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const token = AsyncStorage.getItem("authToken");
  const news = {
    authors: ["LiveMint"],
    categories: ["Mutual Funds"],
    content: "",
    date_extracted: false,
    engagement: { comments: 0, likes: 0 },
    id: "68944d6c34238d9538791cd2",
    impact_label: "Exceptional Impact",
    impact_score: 9.225,
    published_at: "2025-08-07T06:42:19Z",
    related_stocks: null,
    sentiment_label: "neutral",
    sentiment_score: 0.75,
    source: "LiveMint",
    summary:
      "• SoftBank Group announced a net profit of $2.87 billion for the first quarter. • This positive result was driven by strong performance in its portfolio companies. • This means that investors might see potential growth in SoftBank's stock value.",
    tags: null,
    time_ago: "57 minutes ago",
    title: "SoftBank Group reports $2.87 billion profit",
    url: "https://www.livemint.com/companies/company-results/softbank-group-posts-2-87-billion-net-profit-in-first-quarter-11754548939913.html",
  };
  useEffect(() => {
    if (newsId) {
      getNewsByIDAPI(newsId);
      getCommentsAPI(newsId);
      //checkUserLikeNewsStatusAPI(newsId);
      checkLikeStatusAPI(newsId);
    }
    //getBookmarkAPI();
  }, [newsId]);
  // News By Id
  const getNewsByIDAPI = async (newsId: string) => {
    try {
      const response = await getHighImpactNewsById(newsId);
      console.log("newsResponseByID:", response.data);
      setNewsData(response.data);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status?: string;
        message?: string;
      }>;
      const errorData = axiosErr?.response?.data;
      const errorMessage =
        typeof errorData === "object" &&
        errorData !== null &&
        "message" in errorData
          ? (errorData as { message?: string }).message ||
            "Something went wrong"
          : "Something went wrong";
      console.log("NewsByIdErrorMessage", axiosErr.response?.data);
      showToast(errorMessage, "danger");
    } finally {
      setLoading(false);
    }
  };
  // All comments
  const getCommentsAPI = async (newsId: string) => {
    console.log("Inside Get Comments=>");
    try {
      const response = await getComments(newsId);
      console.log("CommentsResponse=>", response.data.data);
      setCommentsData(response.data.data.comments);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("Comments Error=>", errorMessage);
      showToast(errorMessage, "danger");
    }
  };
  //News Like-Unlike and Saved Article Status
  const checkLikeStatusAPI = async (newsId: string) => {
    try {
      const response = await checkLikeStatus(newsId);
      console.log("CheckLikeStatusAPI", response.data);
      setLiked(response.data.liked);
      setBookmarked(response.data.is_pinned);
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
  // News Like and Unlike  API
  const handleToggleLike = () => {
    console.log("inside handleToggleLike");
    setLiked((prev) => !prev);

    if (newsId) {
      toggleLikeAPI(newsId);
    }
  };
  const toggleLikeAPI = async (newsId: any) => {
    try {
      const response = await toggleLike(newsId);
      console.log("Toggle Like=>", response.data);
      showToast(response.data.message, "success");
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("Toggle Like ErrorMessage", axiosErr.response?.data);
      showToast(errorMessage, "danger");
    }
  };
  // Comment Like and Unlike  API
  const handleToggleLikeComment = (commentId: any) => {
    console.log("inside handleToggleLikeComment");
    // setLiked((prev) => !prev);
    // Update state
    if (commentId) {
      toggleLikeCommentAPI(commentId);
    }
  };
  const toggleLikeCommentAPI = async (commentId: any, isLiked?: any) => {
    const likeCommentData = { is_liked: isLiked };
    try {
      const response = await toggleLikeComments(commentId);
      const commentData = response.data.data;
      console.log("Toggle Like Comment=>", commentData);
      setLikedComments((prev) => ({
        ...prev,
        [commentId]: commentData.user_has_liked,
      }));
      //setLikeComment(commentData.user_has_liked);
      // setUnlikeComment(commentData.user_has_liked);
      showToast(response.data.message, "success");
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("Toggle Like Comment ErrorMessage", axiosErr.response);
      showToast(errorMessage, "danger");
    }
  };
  // Bookmark or Save Article API
  const handleToggleBookmark = () => {
    console.log("Inside handleToggleBookmark");
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
    console.log("Inside handlePinNews");
    try {
      const response = await pinNews(newsId);
      console.log("PinNewsResponse=>", response.data);
      console.log("PinNews=>", response.data.success);
      showToast("News bookmarked successfully", "success");
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("ErrorMessagePinNews", axiosErr.response);
      showToast(errorMessage, "danger");
    }
  };
  const handleUnPinNews = async (newsId: string) => {
    console.log("Inside handleUnPinNews");
    try {
      const response = await unpinNews(newsId);
      console.log("UninNewsResponse=>", response.data);
      console.log("UninNews=>", response.data.success);
      showToast("News bookmarked unsuccessfully", "success");
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("ErrorMessageUninNews", axiosErr.response);
      showToast(errorMessage, "danger");
    }
  };
  // Add Comment API
  const addCommentsAPI = async (newsId: any) => {
    setAddCommentsLoader(true);
    const commentData = {
      comment: comment,
    };
    try {
      console.log("AddCommentPaylaod=>", commentData);
      const response = await addComments(newsId, commentData);
      console.log("AddCommentResponse=>", response);
      showToast(response.data.message, "success");
      setComment("");
      getCommentsAPI(newsId);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("AddCommentErrorMessage", axiosErr.response?.data);
      showToast(errorMessage, "danger");
    } finally {
      setAddCommentsLoader(false);
    }
  };
  const getBookmarkAPI = async () => {
    try {
      const response = await getPinnedNews();
      console.log("BookmarkResponse=>", response.data[0].bookmark_status);
      // setBookmarked(response.data[0].bookmark_status);
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
  const checkUserLikeNewsStatusAPI = async (newsId: string) => {
    console.log("Inside checkUserLikeNewsStatusAPI=>");
    try {
      const response = await checkUserLikeNewsStatus(newsId);
      console.log("checkUserLikeNewsStatusAPI=>", response.data);
      // setLiked(response.data.liked);
      setBookmarked(response.data.is_pinned);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("checkUserLikeNewsStatusAPIError=>", axiosErr.response?.data);
      showToast(errorMessage, "danger");
    }
  };
  const addReactionAPI = async (newsId: any) => {
    try {
      const response = await addReaction(newsId);
      console.log(response.data);
      showToast(response.data.message, "success");
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
  // if (loading) return <Loader />;
  // if (addCommentsLoader) return <LoaderOverlay visible={true} />;
  // Split by \n
  // Remove leading/trailing whitespace and split by "•"
  const summaryArray = (newsData.summary ?? "")
    .split("•")
    .map((point) => point.trim())
    .filter((point) => point.length > 0);
  useBackPressNavigate("Home");
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // tweak this if needed
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            globalStyles.pageContainerWithBackground(theme),
            { flex: 0 },
          ]}
        >
          {addCommentsLoader ? (
            <LoaderOverlay visible={true} />
          ) : (
            <>
              <View style={styles.headerContainer}>
                <Header
                  onBackClick={() => {
                    navigation.navigate("Home");
                    console.log("Back to Home");
                  }}
                  liked={liked}
                  setLiked={setLiked}
                  bookmarked={bookmarked}
                  setBookmarked={setBookmarked}
                  onToggleLikeClick={handleToggleLike}
                  shareUrl={newsData.url}
                  onToggleBookmarkClick={handleToggleBookmark}
                  showActivityIcons={true}
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
                  <View style={styles.detailsHeader}>
                    <View style={styles.tagContainer}>
                      {newsData.tag == "bearish" ? (
                        <Tag
                          label={"Bearish"}
                          backgroundColor={"#FFE5E5"}
                          textColor={"#FF5247"}
                        />
                      ) : newsData.tag == "bullish" ? (
                        <Tag
                          label={"Bullish"}
                          backgroundColor={"#ECFCE5"}
                          textColor={"#23C16B"}
                        />
                      ) : newsData.tag == "market" ? (
                        <Tag
                          label={"Market"}
                          backgroundColor={"#E7E7FF"}
                          textColor={"#6B4EFF"}
                        />
                      ) : newsData.tag == "neutral" ? (
                        <Tag
                          label={"Neutral"}
                          backgroundColor={"#ECFCE5"}
                          textColor={"#23C16B"}
                        />
                      ) : newsData.tag == "important" ? (
                        <Tag
                          label={"Important"}
                          backgroundColor={"#E7E7FF"}
                          textColor={"#6B4EFF"}
                        />
                      ) : (
                        ""
                      )}
                    </View>
                    <View style={styles.profileNameContainer}>
                      <ImpactLabel
                        variant={"contained"}
                        label={newsData.impact_label}
                        value={newsData.impact_score}
                        backgroundColor={colors.quindenaryBackground}
                        textColor={colors.quattuordenaryBackground}
                      />
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.articleDetailsHeading,
                      {
                        color:
                          theme === "dark"
                            ? colors.darkPrimaryText
                            : colors.octodenaryText,
                      },
                    ]}
                  >
                    {newsData.title}
                  </Text>
                </View>
                <View style={styles.authorIconContainer}>
                  <NewsAuthorIcon />
                  <View style={styles.authorTimeContainer}>
                    <Text
                      style={[
                        styles.authorTimeText,
                        {
                          color:
                            theme === "light"
                              ? colors.octodenaryText
                              : colors.white,
                          fontSize: 16,
                        },
                      ]}
                    >
                      {`${newsData?.authors?.[0] || "--"} ·`}
                    </Text>
                    <Text
                      style={[
                        styles.authorTimeText,
                        {
                          fontSize: 16,
                          color:
                            theme === "dark"
                              ? colors.darkQuaternaryText
                              : colors.unvigintaryText,
                        },
                      ]}
                    >
                      {`${newsData.time_ago || "--"}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.summaryDetailsConatiner}>
                  <Text
                    style={[
                      styles.keyTakeStyle,
                      {
                        color:
                          theme == "light"
                            ? colors.octodenaryText
                            : colors.white,
                      },
                    ]}
                  >
                    Key Takeaways :
                  </Text>

                  {summaryArray.map((point: any, index: number) => (
                    <View key={index} style={styles.listItem}>
                      <Text
                        style={[
                          styles.listPoints,
                          {
                            color:
                              theme === "dark"
                                ? colors.darkPrimaryText
                                : colors.duovigintaryText,
                          },
                        ]}
                      >
                        {index + 1}.{/* • */}
                      </Text>
                      <Text
                        style={[
                          styles.listPoints,
                          {
                            color:
                              theme === "dark"
                                ? colors.darkPrimaryText
                                : colors.duovigintaryText,
                          },
                        ]}
                      >
                        {point}
                      </Text>
                    </View>
                  ))}
                </View>
                <Divider
                  style={[
                    styles.dividerStyle,
                    {
                      backgroundColor:
                        theme == "light"
                          ? colors.nonaryBorder
                          : colors.darkUndenaryBackground,
                    },
                  ]}
                />
              </View>
              <View style={styles.relatedDiscussionsContainer}>
                <View style={styles.relatedDiscussionsHeader}>
                  <Text
                    style={[
                      styles.relatedDiscussionsHeading,
                      {
                        color:
                          theme === "dark"
                            ? colors.darkPrimaryText
                            : colors.octodenaryText,
                      },
                    ]}
                  >
                    Related Discussions
                  </Text>
                  {commentsData.length > 0 && (
                    <Text
                      style={[
                        styles.commentCount,
                        {
                          color:
                            theme === "dark"
                              ? colors.darkPrimaryText
                              : colors.octodenaryText,
                        },
                      ]}
                    >
                      {`${
                        commentsData.length < 2
                          ? `${commentsData.length} Comment`
                          : `${commentsData.length} Comments`
                      }`}
                    </Text>
                  )}
                </View>
                <View style={styles.relatedDiscussionsDetails}>
                  {(commentsData || []).map((comment: any) => (
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
                                    : colors.octodenaryText,
                              },
                            ]}
                          >
                            {comment.name || "--"}
                          </Text>
                          <Text
                            style={[
                              styles.articleTime,
                              {
                                color:
                                  theme === "dark"
                                    ? colors.darkSenaryText
                                    : colors.unvigintaryText,
                              },
                            ]}
                          >
                            {getShortTimeAgo(comment.commented_at)}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.relatedArticleText,
                            {
                              color:
                                theme === "dark"
                                  ? colors.white
                                  : colors.octodenaryText,
                            },
                          ]}
                        >
                          {comment.comment}
                        </Text>
                        <View style={styles.likeUnlikeContainer}>
                          <View style={styles.likeReplyContainer}>
                            <View style={styles.iconCountContainer}>
                              <TouchableOpacity
                                onPress={() => {
                                  handleToggleLikeComment(comment.id);
                                }}
                              >
                                {!likedComments[comment.id] ? (
                                  <HeartCommentIcon width={20} height={20} />
                                ) : (
                                  <HeartCommentIconFilled
                                    width={20}
                                    height={20}
                                  />
                                )}
                              </TouchableOpacity>
                              <Text
                                style={[
                                  styles.articleTime,
                                  {
                                    color:
                                      theme === "dark"
                                        ? colors.darkSenaryText
                                        : colors.unvigintaryText,
                                  },
                                ]}
                              >
                                {comment.likes || 0}
                              </Text>
                            </View>
                            <Text
                              style={[
                                styles.articleTime,
                                {
                                  color:
                                    theme === "dark"
                                      ? colors.darkSenaryText
                                      : colors.unvigintaryText,
                                },
                              ]}
                            >
                              Reply
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              {commentsData.length > 3 && (
                <View style={styles.viewCommentsContainer}>
                  <Text style={styles.viewCommentsText}>View All Comments</Text>
                </View>
              )}
              <View
                style={[
                  styles.commentContainer,
                  { alignItems: isFocused ? "flex-end" : "center" },
                ]}
              >
                {
                  //@ts-ignore
                  getProfileIcon("male")
                }
                <View
                  style={[
                    styles.commentWrapper,
                    {
                      borderEndColor:
                        theme === "dark"
                          ? colors.duovigintaryText
                          : colors.darkQuinaryText,
                    },
                    isFocused && {
                      flexDirection: "column",
                      alignItems: "stretch",
                      height: "auto",
                      minHeight: 100,
                      //paddingBottom: 8,
                    },
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
                        height: isFocused ? 100 : 48, // Expand height when focused
                        // width: isFocused ? "100%" : "80%", // Expand width when focused
                        textAlignVertical: "top",
                      },
                    ]}
                    placeholder="Add a comment..."
                    placeholderTextColor={
                      theme == "dark"
                        ? colors.darkSenaryText
                        : colors.unvigintaryText
                    }
                    multiline={isFocused}
                    keyboardType="default"
                    value={comment}
                    onChangeText={(text) => {
                      setComment(text);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      if (comment.trim() === "") {
                        setIsFocused(false);
                      }
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      addCommentsAPI(newsId);
                      Keyboard.dismiss(); // dismiss keyboard
                      setIsFocused(false); // manually collapse the textarea
                    }}
                    disabled={comment.trim() === ""}
                    style={{
                      opacity: comment.trim() === "" ? 0.4 : 1,
                    }}
                  >
                    <View
                      style={[
                        styles.commentButton,
                        {
                          alignSelf: isFocused ? "flex-end" : "center",
                          backgroundColor:
                            theme === "dark"
                              ? colors.duodenaryBackground
                              : colors.septendenaryBackground,
                        },
                      ]}
                    >
                      {theme === "light" ? (
                        <CommentIcon />
                      ) : (
                        <CommentIconBlack />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default HeadlineDetailsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 24,
  },
  headingDetailsContainer: {
    gap: 32,
  },
  headingContainer: {
    gap: 16,
  },

  summaryDetailsConatiner: {
    gap: 16,
  },
  keyTakeStyle: {
    fontFamily: fontFamily.Inter700,
    fontSize: 18,
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
    fontFamily: fontFamily.Inter700,
    fontSize: 30,
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
  listPoints: {
    fontSize: 16,
    fontFamily: fontFamily.Inter400,
  },
  relatedDiscussionsContainer: {
    marginTop: 32,
    gap: 28,
  },
  relatedDiscussionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  relatedDiscussionsHeading: {
    fontFamily: fontFamily.Inter700,
    fontSize: 18,
  },
  commentCount: {
    fontFamily: fontFamily.Inter400,
    fontSize: 16,
  },
  relatedDiscussionsDetails: {
    gap: 20,
  },
  relatedDiscussionsArticle: {
    flexDirection: "row",
    gap: 12,
  },
  authorName: {
    fontFamily: fontFamily.Inter500,
    fontSize: 16,
  },
  articleTime: {
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
    color: colors.unvigintaryText,
  },
  relatedArticleText: {
    fontSize: 16,
    fontFamily: fontFamily.Inter400,
    color: colors.duovigintaryText,
  },
  likeUnlikeContainer: {
    flexDirection: "row",
    paddingTop: 8,
    gap: 36,
  },
  likeReplyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  iconCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  commentContainer: {
    //paddingHorizontal: 12,
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
    gap: 16,
  },
  commentWrapper: {
    width: "84%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkQuinaryText,
    padding: 12,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    height: 64,
  },
  commentInput: {
    width: "80%",
    fontFamily: fontFamily.Inter500,
    fontSize: 16,
    //height: 48,
  },
  commentButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: colors.primaryText,
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
  authorTimeText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 12,
  },
  dividerStyle: {
    height: 1,
  },
  viewCommentsContainer: {
    marginTop: 20,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  viewCommentsText: {
    fontFamily: fontFamily.Inter700,
    fontSize: 16,
    color: colors.sexdenaryText,
  },
});
