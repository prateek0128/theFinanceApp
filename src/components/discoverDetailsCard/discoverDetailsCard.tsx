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
  viewValues?: number | any;
  likeValues?: number | any;
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
  viewValues,
  likeValues,
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
              theme === "dark"
                ? colors.darkPrimaryBackground
                : colors.primaryBackground,
          },
        ]}
      >
        <View style={styles.tagsContainer}>
          <View style={styles.marketTagsContainer}>
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
              backgroundColor={colors.quattuordenaryBackground}
              textColor={colors.quindenaryBackground}
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
                    ? colors.darkPrimaryText
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
                    ? colors.darkPrimaryText
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
                      ? colors.darkPrimaryText
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
              <Text style={styles.likeValues}>{viewValues || 0}</Text>
            </View>
            <View style={styles.iconValueContainer}>
              <DiscoverLikeIcon />
              <Text style={styles.likeValues}>{likeValues || 0}</Text>
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
    backgroundColor: colors.white,
    borderColor: colors.tertiaryBorderColor,
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
