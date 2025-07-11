import React, { useEffect } from "react";
import { Alert, Share as RNShare } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  url: string | any;
  message?: string;
}

const ShareSheet: React.FC<Props> = ({
  visible,
  onClose,
  url,
  message = "Check this out 👉",
}) => {
  useEffect(() => {
    if (visible) {
      RNShare.share({
        message: `${message} ${url}`,
        url,
      })
        .catch((err) => {
          if (err?.message && !err.message.includes("User did not share")) {
            Alert.alert("Share failed", err.message);
          }
        })
        .finally(onClose);
    }
  }, [visible]);

  return null;
};

export default ShareSheet;
