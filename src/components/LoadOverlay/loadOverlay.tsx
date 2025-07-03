import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";
import { BlurView } from "expo-blur"; // ✅ add
import { colors } from "../../assets/styles/colors";

const LoaderOverlay = ({ visible }: { visible: boolean }) => (
  <Modal transparent visible={visible} animationType="fade">
    {/* Full‑screen Blur */}
    <BlurView intensity={20} style={styles.backdrop}>
      <ActivityIndicator size="large" color={colors.primary} />
    </BlurView>
  </Modal>
);

export default LoaderOverlay;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
