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
import { getHighImpactNewsById, getNewsFeed } from "../../../apiServices/news";
import LoaderOverlay from "../../../components/LoadOverlay/loadOverlayTransparent";
import {
  GraphImage2,
  FemaleProfileIcon,
  MaleProfileIcon,
  LikeCommentIcon,
  LikeCommentIconFilled,
  UnlikeCommentIcon,
  UnlikeCommentIconFilled,
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
  tag?: string;
}
const HeadlineDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<HeadlineDetailsRouteProp>();
  const { newsId, imageKey } = route.params || {};
  const [comment, setComment] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [commentsData, setCommentsData] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newsData, setNewsData] = useState<NewsData>({});
  const [likeComment, setLikeComment] = useState(false);
  const [unlikeComment, setUnlikeComment] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [addCommentsLoader, setAddCommentsLoader] = useState<boolean>(false);
  const token = AsyncStorage.getItem("authToken");
  // console.log("AccessToken", token);
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
  useEffect(() => {
    if (newsId) {
      getNewsByIDAPI(newsId);
      getCommentsAPI(newsId);
      checkUserLikeNewsStatusAPI(newsId);
      checkLikeStatusAPI(newsId);
    }
    getBookmarkAPI();
  }, [newsId]);
  const getNewsByIDAPI = async (newsId: string) => {
    try {
      const response = await getHighImpactNewsById(newsId);
      console.log("newsResponseByID:", response.data);
      setNewsData(response.data);
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
  const getCommentsAPI = async (newsId: string) => {
    console.log("Inside Get Comments=>");
    try {
      const response = await getComments(newsId);
      console.log("CommentsResponse=>", response.data.data.comments);
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
      console.log("Toggle Like ErrorMessage", axiosErr.response);
      showToast(errorMessage, "danger");
    }
  };
  const handleToggleLikeComment = (commentId: any) => {
    console.log("inside handleToggleLikeComment");
    // setLiked((prev) => !prev);
    // Calculate the next liked value
    const nextLiked = !liked;
    // Update state
    setLiked(nextLiked);
    if (commentId) {
      toggleLikeCommentAPI(commentId);
    }
  };
  const toggleLikeCommentAPI = async (commentId: any) => {
    const likeCommentData = { is_liked: liked };
    try {
      const response = await toggleLikeComments(commentId, likeCommentData);
      console.log("Toggle Like Comment=>", response.data);
      setLikeComment(response.data.data.user_has_liked);
      setUnlikeComment(response.data.data.user_has_unliked);
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
      console.log("AddCommentErrorMessage", axiosErr.response);
      showToast(errorMessage, "danger");
    } finally {
      setAddCommentsLoader(false);
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
  // if (loading) return <Loader />;
  // if (addCommentsLoader) return <LoaderOverlay visible={true} />;
  // Split by \n
  const summaryArray = (newsData?.summary ?? "")
    .split("\n")
    .map((p) => p.replace(/^•\s*/, "")) // Remove leading • and space if present
    .filter((p) => p.trim() !== ""); // Remove empty lines
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          globalStyles.pageContainerWithBackground(theme),
          { flex: 0 },
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
                {newsData.tag == "bearish" ? (
                  <Tag
                    label={"Bearish"}
                    backgroundColor={"#10B98126"}
                    textColor={"#10B981"}
                  />
                ) : newsData.tag == "bullish" ? (
                  <Tag
                    label={"Bullish"}
                    backgroundColor={"#EF444426"}
                    textColor={"#EF4444"}
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
          </View>

          <View style={styles.headingDetails}>
            <View>
              {summaryArray.map((point, index) => (
                <View key={index} style={styles.listItem}>
                  <Text
                    style={[
                      styles.listIndex,
                      {
                        color:
                          theme === "dark"
                            ? colors.darkPrimaryText
                            : colors.primaryText,
                      },
                    ]}
                  >
                    {index + 1}.
                  </Text>
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
                    {point}
                  </Text>
                </View>
              ))}
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
            {(commentsData || []).map((comment: any) => (
              <View key={comment.id} style={styles.relatedDiscussionsArticle}>
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
                      {comment.name || "--"}
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
                      <TouchableOpacity
                        onPress={() => {
                          console.log(
                            "👍 Like icon pressed for comment:",
                            comment.id
                          );
                          handleToggleLikeComment(comment.id);
                        }}
                      >
                        {!likeComment ? (
                          <LikeCommentIcon width={20} height={20} />
                        ) : (
                          <LikeCommentIconFilled width={20} height={20} />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.articleTime}>
                        {comment.likes || 0}
                      </Text>
                    </View>
                    <View style={styles.iconCountContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(
                            "👎 Dislike icon pressed for comment:",
                            comment.id
                          );
                          handleToggleLikeComment(comment.id);
                        }}
                      >
                        {!unlikeComment ? (
                          <UnlikeCommentIcon width={20} height={20} />
                        ) : (
                          <UnlikeCommentIconFilled width={20} height={20} />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.articleTime}>
                        {comment.unlike_count || 0}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // tweak this if needed
        >
          <View style={[styles.commentContainer]}>
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
              disabled={comment.trim() === ""}
              style={{
                opacity: comment.trim() === "" ? 0.4 : 1,
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
        </KeyboardAvoidingView>
      </ScrollView>
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
