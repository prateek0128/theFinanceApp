import React, { useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Easing,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import { AuthContext } from "../../context/loginAuthContext";
import { MarketBriefsLogo } from "../../assets/icons/components/logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../context/themeContext";
import globalStyles from "../../assets/styles/globalStyles";

const { width } = Dimensions.get("window");

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const logoTranslateX = useRef(new Animated.Value(80)).current;
  const logoScale = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoTranslateX, {
          toValue: -5, // fine-tuned for visual center alignment
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(logoScale, {
          toValue: 0.6,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();

      setTimeout(() => {
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 300);
    }, 1000);

    const navDelay = setTimeout(async () => {
      const onboardingCompletedStr = await AsyncStorage.getItem(
        "onboardingCompleted"
      );
      const onboardingCompleted = onboardingCompletedStr
        ? JSON.parse(onboardingCompletedStr)
        : false; // default if null
      if (isLoggedIn && onboardingCompleted) {
        navigation.replace("BottomTabNavigator");
      } else {
        navigation.replace("Start");
      }
    }, 3000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(navDelay);
    };
  }, [isLoggedIn, isLoading]);

  return (
    <View
      style={[
        globalStyles.pageContainerWithBackground(theme),
        styles.container,
        { padding: 0 },
      ]}
    >
      <View style={styles.row}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ translateX: logoTranslateX }, { scale: logoScale }],
            },
          ]}
        >
          <MarketBriefsLogo />
        </Animated.View>

        <Animated.View style={[styles.nameBlock, { opacity: textOpacity }]}>
          <View style={styles.divider} />
          <View>
            <Text
              style={[
                styles.appNameText,
                {
                  color: theme == "dark" ? colors.white : colors.octodenaryText,
                },
              ]}
            >
              Market
            </Text>
            <Text
              style={[
                styles.appNameText,
                {
                  color: theme == "dark" ? colors.white : colors.octodenaryText,
                },
              ]}
            >
              Briefs
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nameBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  appNameText: {
    fontSize: 56,
    color: colors.octodenaryText,
    fontFamily: fontFamily.Inter600,
    //textAlign: "center",
  },
  divider: {
    width: 1,
    height: 112,
    backgroundColor: colors.darkSenaryText,
    marginRight: 20,
  },
});
