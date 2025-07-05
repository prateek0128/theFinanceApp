// components/HeadlineDetailCard.js

import React, { useState } from "react";
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
const { width } = Dimensions.get("window");

type HeadlineDetailCardProps = {
  index: number;
  authorName: string;
  timeAgo: string;
  impactLabel: string;
  impactScore: number | string;
  heading: string;
  summary: string;
  HeadlineImageComponent?: React.ComponentType<{
    width?: number;
    height?: any;
  }>;
  ProfileIconComponent?: React.ComponentType<{ width: any; height?: any }>;
  ImpactIconComponent?: React.ComponentType<{
    width: any;
    height?: any;
  }>;
  onPress?: () => void;
};

const HeadlineDetailCard = ({
  index,
  authorName,
  timeAgo,
  impactLabel,
  impactScore,
  heading,
  summary,
  HeadlineImageComponent,
  ProfileIconComponent,
  ImpactIconComponent,
  onPress,
}: HeadlineDetailCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} key={index}>
      <View style={styles.detailsHeadlineContainer}>
        <View style={styles.detailsHeader}>
          <View style={styles.profileNameContainer}>
            {ProfileIconComponent && <ProfileIconComponent width={24} />}
            <View style={styles.profileName}>
              <Text style={styles.headingName}>{authorName}</Text>
              <Text style={styles.meta}>{timeAgo}</Text>
            </View>
          </View>
          <View style={styles.profileNameContainer}>
            {ImpactIconComponent && <ImpactIconComponent width={24} />}
            <View style={styles.impactLabel}>
              <Text style={styles.impactLabelText}>
                {impactLabel} : {impactScore}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.articleDetailsHeadingContainer}>
          <Text style={styles.articleDetailsHeading}>{heading}</Text>
          <Text style={styles.articleDetailsSubHeading}>{summary}</Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ClippedSVG
            width={width * 0.82}
            height={200}
            radius={16}
            ImageComponent={HeadlineImageComponent}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HeadlineDetailCard;

const styles = StyleSheet.create({
  detailsHeadlineContainer: {
    flexDirection: "column",
    gap: 24,
    marginTop: 40,
    padding: 16,
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: colors.tertiaryBackground,
    borderColor: colors.tertiaryBorderColor,
    width: "100%",
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
    fontFamily: fontFamily.Cabinet700,
    fontSize: 12,
    color: colors.primaryText,
  },
  meta: {
    fontSize: 10,
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
  articleDetailsHeadingContainer: {
    gap: 12,
  },
  articleDetailsHeading: {
    fontFamily: fontFamily.Cabinet700,
    fontSize: 24,
    color: colors.primaryText,
  },
  articleDetailsSubHeading: {
    fontFamily: fontFamily.Satoshi400,
    fontSize: 14,
    color: colors.tertiaryText,
  },
  imageStyle: {
    borderRadius: 16,
  },
});
