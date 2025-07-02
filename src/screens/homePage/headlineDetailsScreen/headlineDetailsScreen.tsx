import React, { useState, useEffect } from "react";
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
  LikeIcon,
  UnlikeIcon,
  CommentIcon,
  CurrencyImage2,
} from "../../../assets/icons/components/headlineDetailsView";
import HeadlineDetailCard from "../../../components/headlineDetailedCard/headlineDetailedCard";
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
import { getComments } from "../../../apiServices/newsEngagement";
import { getNewsByID } from "../../../apiServices/news";
const { width, height } = Dimensions.get("window");
interface Discussion {
  id: string;
  name: string;
  time: string;
  text: string;
  likes: number;
  unlikes: number;
  profileType: "male" | "female";
}

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
const HeadlineDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [comment, setComment] = useState("");
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
  const newsData = {
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

  useEffect(() => {
    if (newsId) {
      getCommentsAPI(newsId);
      getNewsByIDAPI(newsId);
    }
  }, []);

  // const getCommentsAPI = async () => {
  //   try {
  //     const response = await getComments();
  //     console.log(response);
  //   } catch (error) {
  //     console.log("API Error:", error);
  //   }
  // };
    // const addReactionAPI = async () => {
    //   try {
    //     const response = await addReaction();
    //     console.log(response.data);
    //   } catch (error) {
    //  console.log("API Error:", error);
    //   }
    // }

      // const toggleLikeAp = async () => {
      //   try {
      //     const response = await toggleLike();
      //     console.log(response.data);
      //   } catch (error) {
      //     console.log("API Error:", error);
      //   }
      // }

          // const checkLikeStatusAPI = async () => {
          //   try {
          //     const response = await checkLikeStatus();
          //     console.log(response.data);
          //   } catch (error) {
          //     console.log("API Error:", error);
          //   }
          // }

          // const addCommentsAPI = async () => {
          //   try {
          //     const response = await addComments();
          //     console.log(response.data);
          //   } catch (error) {
          //     console.log("API Error:", error);
          //   }
          // }

          // const deleteComments = async () => {
          //   try {
          //     const response = await deleteComments();
          //     console.log(response.data);

          //   } catch (error) {
          //     console.log("API Error:", error);
          //   }
          // }

  const getNewsByIDAPI = async (newsId: string) => {
    try {
      const response = await getNewsByID(newsId);
      console.log("newsResponseByID:", response.data);
    } catch (e) {
      console.log("API Error:", e);
    }
  };
  const getCommentsAPI = async (newsId: string) => {
    try {
      const response = await getComments(newsId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileIcon = (type: "male" | "female") => {
    return type === "female" ? (
      <FemaleProfileIcon width={40} height={40} />
    ) : (
      <MaleProfileIcon width={40} height={40} />
    );
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        //keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // tweak this if needed
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Header onPress={() => navigation.navigate("Home")} />
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
              {renderImage()}
            </View>
            <View style={styles.headingContainer}>
              <Text style={styles.articleDetailsHeading}>{title}</Text>
              <View style={styles.detailsHeader}>
                <View style={styles.profileNameContainer}>
                  <ProfileIcon width={30} height={30} />
                  <View style={styles.profileName}>
                    <Text style={styles.headingName}>{author}</Text>
                    <Text style={styles.meta}>{time}</Text>
                  </View>
                </View>
                <View style={styles.profileNameContainer}>
                  <IncrementArrow width={16} height={16} />
                  <View style={styles.impactLabel}>
                    <Text style={styles.impactLabelText}>
                      Impact Score : {impactScore}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.headingDetails}>
              {points?.map((point, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.listIndex}>{index + 1}.</Text>
                  <Text style={styles.listPoints}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.relatedDiscussionsContainer}>
            <Text style={styles.relatedDiscussionsHeading}>
              Related Discussions
            </Text>
            <View style={styles.relatedDiscussionsDetails}>
              {Array.isArray(discussions) &&
                discussions.map((d) => (
                  <View key={d.id} style={styles.relatedDiscussionsArticle}>
                    {
                      //@ts-ignore
                      getProfileIcon(d.profileType)
                    }
                    <View style={{ flex: 1 }}>
                      <View style={styles.relatedDiscussionsArticle}>
                        <Text style={styles.authorName}>{d.name}</Text>
                        <Text style={styles.articleTime}>{d.time}</Text>
                      </View>
                      <Text style={styles.relatedArticleText}>{d.text}</Text>
                      <View style={styles.likeUnlikeContainer}>
                        <View style={styles.iconCountContainer}>
                          <TouchableOpacity>
                            <LikeIcon width={16} height={16} />
                          </TouchableOpacity>
                          <Text style={styles.articleTime}>{d.likes}</Text>
                        </View>
                        <View style={styles.iconCountContainer}>
                          <TouchableOpacity>
                            <UnlikeIcon width={16} height={16} />
                          </TouchableOpacity>
                          <Text style={styles.articleTime}>{d.unlikes}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </View>
          <View style={styles.commentContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              keyboardType="email-address"
              value={comment}
              onChangeText={(text) => {
                setComment(text);
              }}
            />
            <View style={styles.commentButton}>
              <CommentIcon />
            </View>
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
    backgroundColor: colors.primaryBackground,
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
    fontFamily: fontFamily.titleFont,
    fontSize: 32,
    color: colors.primaryText,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontFamily: fontFamily.titleFont,
    fontSize: 12,
    color: colors.primaryText,
  },
  meta: {
    fontSize: 8,
    fontFamily: fontFamily.textFont500,
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
    fontFamily: fontFamily.textFont500,
    color: colors.quaternaryText,
  },
  listPoints: {
    fontSize: 16,
    fontFamily: fontFamily.textFont500,
    color: colors.tertiaryText,
  },
  relatedDiscussionsContainer: {
    marginTop: 32,
    gap: 28,
  },
  relatedDiscussionsHeading: {
    fontFamily: fontFamily.titleFont,
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
    fontFamily: fontFamily.titleFont,
    fontSize: 16,
    color: colors.senaryText,
  },
  articleTime: {
    fontSize: 14,
    fontFamily: fontFamily.timeText,
    color: colors.septenaryText,
  },
  relatedArticleText: {
    fontSize: 14,
    fontFamily: fontFamily.textFont400,
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
    fontFamily: fontFamily.textFont500,
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
