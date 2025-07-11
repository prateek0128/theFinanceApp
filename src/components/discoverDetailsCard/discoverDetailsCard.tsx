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
import fontFamily from "../../assets/styles/fontFamily";
import ClippedSVG from "../clippedSVG/clippedSVG";
import {
  ViewIcon,
  DiscoverLikeIcon,
} from "../../assets/icons/components/headlineDetailsView";
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
      <View
        style={[
          styles.detailsHeadlineContainer,
          {
            backgroundColor:
              theme === "dark" ? colors.darkOctonary : colors.primaryBackground,
            borderColor:
              theme === "dark"
                ? colors.senaryBorderColor
                : colors.tertiaryBorderColor,
          },
        ]}
      >
        <View style={styles.tagsContainer}>
          <View style={styles.marketTagsContainer}>
            <Tag
              label={"Bearish"}
              backgroundColor={"#10B98126"}
              textColor={"#10B981"}
            />
            <Tag
              label={"Bullish"}
              backgroundColor={"#EF444426"}
              textColor={"#EF4444"}
            />
          </View>
          <View>
            {/* <View style={styles.impactLabel}>
              <Text style={styles.impactLabelText}>
                {impactLabel} : {impactScore}
              </Text>
            </View> */}

            <ImpactLabel
              variant={"outlined"}
              label={impactLabel}
              value={impactScore}
              backgroundColor={
                theme == "dark"
                  ? colors.darkDenaryBackground
                  : colors.quattuordenaryBackground
              }
              textColor={
                theme === "dark"
                  ? colors.quindenaryBackground
                  : colors.septnaryBorderColor
              }
              borderColor={colors.septnaryBorderColor}
            />
          </View>
        </View>
        <View style={styles.articleDetailsHeadingContainer}>
          <Text
            style={[
              styles.articleDetailsHeading,
              {
                color:
                  theme === "dark"
                    ? colors.darkSecondaryText
                    : colors.primaryText,
              },
            ]}
          >
            {heading}
          </Text>
          <Text
            style={[
              styles.articleDetailsSubHeading,
              {
                color:
                  theme === "dark"
                    ? colors.darkQuaternaryText
                    : colors.primaryText,
              },
            ]}
            numberOfLines={2}
          >
            {summary}
          </Text>
        </View>
        <View style={styles.authorLikesContainer}>
          <View style={styles.authorTimeContainer}>
            <Text
              style={[
                styles.authorTimeText,
                {
                  color:
                    theme === "dark"
                      ? colors.darkQuaternaryText
                      : colors.primaryText,
                },
              ]}
            >
              {`via ${authorName || "--"} · ${timeAgo || "--"}`}
            </Text>
          </View>
          <View style={styles.viewLikesContainer}>
            <View style={styles.iconValueContainer}>
              <ViewIcon />
              <Text style={styles.likeValues}>{comments || 0}</Text>
            </View>
            <View style={styles.iconValueContainer}>
              <DiscoverLikeIcon />
              <Text style={styles.likeValues}>{likes || 0}</Text>
            </View>
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
    gap: 16,
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderRadius: 20,
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
    gap: 16,
  },
  articleDetailsHeading: {
    fontFamily: fontFamily.Cabinet700,
    fontSize: 16,
    color: colors.primaryText,
  },
  articleDetailsSubHeading: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 12,
    color: colors.tertiaryText,
  },
  authorLikesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  authorTimeText: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 14,
    color: colors.tertiaryText,
  },
  viewLikesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  likeValues: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 12,
    color: colors.duodenaryText,
  },
});
