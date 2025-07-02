// components/ShareButtons.tsx
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Share,
  Linking,
  Alert,
  Platform,
} from "react-native";

type Props = {
  url: string; // link you want to share
  message?: string; // text for WhatsApp / share sheet
};

const ShareButtons: React.FC<Props> = ({
  url,
  message = "Check this out 👉",
}) => {
  /** Generic helper: try deep‑link → else system share sheet */
  const openOrShare = async (deepLink: string) => {
    try {
      const supported = await Linking.canOpenURL(deepLink);
      if (supported) {
        await Linking.openURL(deepLink);
      } else {
        await Share.share({ message: `${message} ${url}`, url });
      }
    } catch (err: any) {
      // user cancelled share sheet => no alert
      if (err.message && !err.message.includes("User did not share")) {
        Alert.alert("Share failed", err.message);
      }
    }
  };

  /* Individual targets --------------------------------------------------- */
  const shareWhatsApp = () =>
    openOrShare(
      `whatsapp://send?text=${encodeURIComponent(`${message} ${url}`)}`
    );

  const shareInstagram = () =>
    // Instagram expects a URL; story/image sharing requires File UTI -> skip here
    openOrShare(`instagram://share?text=${encodeURIComponent(url)}`);

  const shareTwitter = () =>
    openOrShare(
      Platform.select({
        ios: `twitter://post?message=${encodeURIComponent(
          `${message} ${url}`
        )}`,
        android: `twitter://post?text=${encodeURIComponent(
          `${message} ${url}`
        )}`,
      }) as string
    );

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={shareWhatsApp}>
        {/* FontAwesome आइकन नाम: 'whatsapp' */}
        <FontAwesome name="whatsapp" size={36} color="#25D366" />
      </TouchableOpacity>

      <TouchableOpacity onPress={shareInstagram}>
        {/* FontAwesome5 आइकन नाम: 'instagram' */}
        <FontAwesome5 name="instagram" size={36} color="#E1306C" />
      </TouchableOpacity>

      <TouchableOpacity onPress={shareTwitter}>
        {/* FontAwesome आइकन नाम: 'twitter' */}
        <FontAwesome name="twitter" size={36} color="#1DA1F2" />
      </TouchableOpacity>
    </View>
  );
};

export default ShareButtons;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  icon: { width: 36, height: 36, resizeMode: "contain" },
});
