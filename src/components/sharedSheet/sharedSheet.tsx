// components/ShareSheet.tsx
import React, { useRef, useEffect } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Platform,
  Share as RNShare,
  Linking,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onClose: () => void;
  url: string;
  message?: string;
}

const ShareSheet: React.FC<Props> = ({
  visible,
  onClose,
  url,
  message = "Check this out 👉",
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // starts off‑screen

  /* ───── slide in / out on visible flag ───── */
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 300,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  /* ───── share helpers ───── */
  const openOrShare = async (deepLink: string) => {
    try {
      const supported = await Linking.canOpenURL(deepLink);
      if (supported) {
        await Linking.openURL(deepLink);
      } else {
        await RNShare.share({ message: `${message} ${url}`, url });
      }
      onClose(); // hide sheet afterward
    } catch (err: any) {
      if (!err?.message?.includes("User did not share")) {
        Alert.alert("Share failed", err.message);
      }
    }
  };

  /* individual apps */
  const toWhatsApp = () =>
    openOrShare(
      `whatsapp://send?text=${encodeURIComponent(`${message} ${url}`)}`
    );

  const toInstagram = () =>
    openOrShare(`instagram://share?text=${encodeURIComponent(url)}`);

  const toTwitter = () =>
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

  /* ───── UI ───── */
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* dark backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.handle} />
        <View style={styles.row}>
          <FontButton
            onPress={toWhatsApp}
            name="whatsapp"
            brandColor="#000000"
          />
          <FontButton
            onPress={toInstagram}
            name="instagram"
            brandColor="#000000"
            isFa5
          />
          <FontButton onPress={toTwitter} name="twitter" brandColor="#000000" />
          {}
        </View>
      </Animated.View>
    </Modal>
  );
};

/* icon wrapper */
const FontButton = ({
  onPress,
  name,
  brandColor,
  isFa5 = false,
}: {
  onPress: () => void;
  name: string;
  brandColor: string;
  isFa5?: boolean;
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.iconWrap}>
      {isFa5 ? (
        <FontAwesome name={name as any} size={36} color={brandColor} />
      ) : (
        <FontAwesome name={name as any} size={36} color={brandColor} />
      )}
    </View>
  </TouchableWithoutFeedback>
);

export default ShareSheet;

/* ───── styles ───── */
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 24,
  },
  iconWrap: {
    padding: 6,
  },
});
