import { Platform, ToastAndroid } from "react-native";
import { showMessage } from "react-native-flash-message";
import { colors } from "../assets/styles/colors";


const showToast = (msg: string, type: "success" | "danger"|"warning") => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else {
      showMessage({
        message: msg,
        type,
        backgroundColor: colors.primary,
        color: "#fff",
      });
    }
  };
  export default showToast;