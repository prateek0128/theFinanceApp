// components/HeadlineDetailCard.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  BackArrowIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
} from "../../assets/icons/components/header";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";

const { width } = Dimensions.get("window");

type HeaderProps = {
  onPress?: () => void;
};

const Header = ({ onPress }: HeaderProps) => {
  return (
    <View style={styles.headerConatiner}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.leftHeaderPart}>
          <BackArrowIcon />
        </View>
      </TouchableOpacity>
      <View style={styles.rightHeaderPart}>
        <HeartIcon />
        <BookmarkIcon />
        <ShareIcon />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerConatiner: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftHeaderPart: {},
  rightHeaderPart: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
});
