// components/LoaderOverlayTransparent.tsx
import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../../assets/styles/colors";

const LoaderOverlayTransparent = ({ visible }: { visible: boolean }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.cover}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  </Modal>
);

export default LoaderOverlayTransparent;

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // ⭐ NO backgroundColor → full transparency
  },
});
