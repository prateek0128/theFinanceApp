// components/HeadlineDetailCard.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BackArrowIcon, ShareIcon } from "../../assets/icons/components/header";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import {
  LikePostIconFilled,
  LikePostIcon,
  BookmarkIcon,
  BookmarkIconFilled,
} from "../../assets/icons/components/headlineDetailsView";
import ShareSheet from "../sharedSheet/sharedSheet";

const { width } = Dimensions.get("window");
type HeaderProps = {
  onBackClick?: () => void;
  liked?: boolean;
  setLiked?: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleLikeClick?: () => void;
  bookmarked?: boolean;
  setBookmarked?: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleBookmarkClick?: () => void;
  shareUrl?: string;
};

const Header = ({
  onBackClick,
  liked,
  setLiked,
  onToggleLikeClick,
  bookmarked,
  setBookmarked,
  onToggleBookmarkClick,
  shareUrl,
}: HeaderProps) => {
  const [open, setOpen] = useState(false);
  console.log("LikedStatus=>", liked);
  return (
    <View style={styles.headerConatiner}>
      <TouchableOpacity onPress={onBackClick}>
        <View style={styles.leftHeaderPart}>
          <BackArrowIcon />
        </View>
      </TouchableOpacity>
      <View style={styles.rightHeaderPart}>
        <TouchableOpacity onPress={onToggleLikeClick}>
          {liked ? <LikePostIconFilled /> : <LikePostIcon />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onToggleBookmarkClick}>
          {bookmarked ? <BookmarkIconFilled /> : <BookmarkIcon />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <ShareIcon />
        </TouchableOpacity>
        <ShareSheet
          visible={open}
          onClose={() => setOpen(false)}
          url={shareUrl}
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
