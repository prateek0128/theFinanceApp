import React, { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Animated, Text, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import { AuthContext } from "../../context/loginAuthContext";
import { MarketBriefsLogo } from "../../assets/icons/components/logo"; // Assuming it's SVG or compatible with Animated.View

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  const logoScale = useRef(new Animated.Value(1)).current;
  const logoTranslateX = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial wait to show logo
    const initialDelay = setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 0.6,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(logoTranslateX, {
          toValue: -10, // adjust as per your UI needs
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();

      // Fade in the text after logo shifts
      setTimeout(() => {
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 300);
    }, 1000);

    // Navigate after full animation
    const navDelay = setTimeout(() => {
      if (isLoggedIn) {
        navigation.replace("BottomTabNavigator");
      } else {
        navigation.replace("Start");
      }
    }, 2500);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(navDelay);
    };
  }, [isLoggedIn, isLoading]);

  return (
    <View style={styles.container}>
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
            <Text style={styles.appNameText}>Market</Text>
            <Text style={styles.appNameText}>Briefs</Text>
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
    justifyContent: "center", // vertical center
    alignItems: "center", // horizontal center
    //  backgroundColor: colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  logoContainer: {
    // marginRight: 10,
  },
  appNameText: {
    fontSize: 56,
    color: colors.octodenaryText,
    fontFamily: fontFamily.Inter600,
    textAlign: "center",
  },
  nameBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  divider: {
    width: 1,
    height: 112, // 2 * fontSize (56)
    backgroundColor: colors.darkSenaryText,
    marginRight: 25,
  },
});
