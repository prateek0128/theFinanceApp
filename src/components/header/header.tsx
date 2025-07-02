// components/HeadlineDetailCard.js

import React, { useState } from "react";
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
import ShareButtons from "../sharedButton/sharedButtons";
import {
  LikeIcon,
  LikeIconFilled,
  BookmarkIconFilled,
} from "../../assets/icons/components/headlineDetailsView";
const { width } = Dimensions.get("window");

type HeaderProps = {
  onPress?: () => void;
  liked?: boolean;
  setLiked?: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarked?: boolean;
  setBookmarked?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({
  onPress,
  liked,
  setLiked,
  bookmarked,
  setBookmarked,
}: HeaderProps) => {
  return (
    <View style={styles.headerConatiner}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.leftHeaderPart}>
          <BackArrowIcon />
        </View>
      </TouchableOpacity>
      <View style={styles.rightHeaderPart}>
        <TouchableOpacity onPress={() => setLiked && setLiked(!liked)}>
          {liked ? <LikeIconFilled /> : <HeartIcon />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setBookmarked && setBookmarked(!bookmarked)}
        >
          {bookmarked ? <BookmarkIconFilled /> : <BookmarkIcon />}
        </TouchableOpacity>
        {/* <ShareIcon /> */}
        <ShareButtons
          url={`https://www.moneycontrol.com/news/business/markets/emkay-global-sees-22-upside-for-hdb-financial-shares-from-ipo-s-upper-price-band-13216416.html`}
          message={`Have a look at  "URL"`}
        />
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
