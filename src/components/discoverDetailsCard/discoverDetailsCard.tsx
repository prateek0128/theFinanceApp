// components/HeadlineDetailCard.js

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../assets/styles/colors";
import {
  CommentsIcon,
  LikeIcon,
  NewsAuthorIcon,
  ImpactArrowGreen,
  ImpactArrowRed,
} from "../../assets/icons/components/homepage";
import fontFamily from "../../assets/styles/fontFamily";
import ClippedSVG from "../clippedSVG/clippedSVG";
import Tag from "../tag/tag";
import ImpactLabel from "../impactLabel/impactLabel";
import { ThemeContext } from "../../context/themeContext";
const { width } = Dimensions.get("window");

type DiscoverDetailsCardProps = {
  index?: number;
  authorName?: string;
  timeAgo?: string;
  impactLabel?: string;
  impactScore?: number | string;
  heading?: string;
  summary?: string;
  likes?: number | any;
  comments?: number | any;
  tag?: string;
  HeadlineImageComponent?: React.ComponentType<{
    width?: number;
    height?: any;
  }>;
  ProfileIconComponent?: React.ComponentType<{ width: any; height?: any }>;
  ImpactIconComponent?: React.ComponentType<{
    width: any;
    height?: any;
  }>;
  //   ViewIconComponent?: React.ComponentType<{}>;
  //   LikeIconComponent?: React.ComponentType<{}>;
  onPress?: () => void;
};

const DiscoverDetailsCard = ({
  index,
  authorName,
  timeAgo,
  impactLabel,
  impactScore,
  heading,
  summary,
  likes,
  comments,
  tag,
  HeadlineImageComponent,
  ProfileIconComponent,
  ImpactIconComponent,
  //   ViewIconComponent,
  //   LikeIconComponent,
  onPress,
}: DiscoverDetailsCardProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={onPress} key={index}>
      <View style={[styles.detailsHeadlineContainer]}>
        <View style={styles.authorLikesContainer}>
          <View style={styles.authorIconContainer}>
            <NewsAuthorIcon />
            <View style={styles.authorTimeContainer}>
              <Text
                style={[
                  styles.authorTimeText,
                  {
                    color:
                      theme === "light" ? colors.octodenaryText : colors.white,
                  },
                ]}
              >
                {`${authorName || "--"} ·`}
              </Text>
              <Text
                style={[
                  styles.authorTimeText,
                  {
                    color:
                      theme === "dark"
                        ? colors.darkQuaternaryText
                        : colors.unvigintaryText,
                  },
                ]}
              >
                {`${timeAgo || "--"}`}
              </Text>
            </View>
          </View>
          <View style={styles.viewLikesContainer}>
            <View style={styles.iconValueContainer}>
              <CommentsIcon />
              <Text
                style={[
                  styles.likeValues,
                  {
                    color:
                      theme == "dark"
                        ? colors.darkSenaryText
                        : colors.unvigintaryText,
                  },
                ]}
              >
                {comments || 0}
              </Text>
            </View>
            <View style={styles.iconValueContainer}>
              <LikeIcon />
              <Text
                style={[
                  styles.likeValues,
                  {
                    color:
                      theme == "dark"
                        ? colors.darkSenaryText
                        : colors.unvigintaryText,
                  },
                ]}
              >
                {likes || 0}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.articleDetailsHeadingContainer}>
          <Text
            style={[
              styles.articleDetailsHeading,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
            ]}
          >
            {heading}
          </Text>
          <Text
            style={[
              styles.articleDetailsSubHeading,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
            ]}
            numberOfLines={2}
          >
            {summary?.replace(/•\s*/g, "")}
          </Text>
        </View>
        <View style={styles.tagsContainer}>
          <View style={styles.marketTagsContainer}>
            {tag == "bearish" ? (
              <Tag
                label={"Bearish"}
                backgroundColor={
                  theme == "light" ? "#FFE5E5" : colors.darkUndenaryBackground
                }
                textColor={"#FF5247"}
              />
            ) : tag == "bullish" ? (
              <Tag
                label={"Bullish"}
                backgroundColor={
                  theme == "light" ? "#ECFCE5" : colors.darkUndenaryBackground
                }
                textColor={"#23C16B"}
              />
            ) : tag == "market" ? (
              <Tag
                label={"Market"}
                backgroundColor={
                  theme == "light" ? "#E7E7FF" : colors.darkUndenaryBackground
                }
                textColor={"#6B4EFF"}
              />
            ) : tag == "neutral" ? (
              <Tag
                label={"Neutral"}
                backgroundColor={
                  theme == "light" ? "#E7E7FF" : colors.darkUndenaryBackground
                }
                textColor={"#6B4EFF"}
              />
            ) : tag == "important" ? (
              <Tag
                label={"Important"}
                backgroundColor={
                  theme == "light" ? "#E7E7FF" : colors.darkUndenaryBackground
                }
                textColor={"#6B4EFF"}
              />
            ) : (
              ""
            )}
          </View>
          <View>
            {/* <View style={styles.impactLabel}>
              <Text style={styles.impactLabelText}>
                {impactLabel} : {impactScore}
              </Text>
            </View> */}

            <ImpactLabel
              label={impactLabel}
              value={impactScore}
              ImpactArrow={ImpactArrowGreen}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DiscoverDetailsCard;

const styles = StyleSheet.create({
  detailsHeadlineContainer: {
    flexDirection: "column",
    gap: 24,
    marginTop: 20,
    borderRadius: 16,
    width: "100%",
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marketTagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  articleDetailsHeadingContainer: {
    gap: 10,
  },
  articleDetailsHeading: {
    fontFamily: fontFamily.Inter700,
    fontSize: 20,
  },
  articleDetailsSubHeading: {
    fontFamily: fontFamily.Inter400,
    fontSize: 14,
  },
  authorLikesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontSize: 14,
  },

  viewLikesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  likeValues: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 12,
  },
});
