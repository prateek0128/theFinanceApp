import React, { useState, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "../../context/themeContext";
import { showMessage } from "react-native-flash-message";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import { colors } from "../../assets/styles/colors";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import fontFamily from "../../assets/styles/fontFamily";
import { ScrollView } from "react-native-gesture-handler";
import showToast from "../../utilis/showToast";
const interests = [
  "Stock Market News",
  "Indian Companies",
  "Startups & IPO’s",
  "Crypto & Digital Coins",
  "Mutual Funds News",
  "Banking & RBI",
  "Economy & Budget",
  "Digital Payments",
  "Commodities (Gold, Oil)",
  "Global Market News",
  "Govt & Policy Updates",
  "Loans & Insurance",
  "Contracts",
  "Indices",
  "Quarterly Reports",
];
const { width, height } = Dimensions.get("window");
export default function ChooseYourInterests() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<string[]>([]);
  const groupedInterests = Array.from(
    { length: Math.ceil(interests.length / 3) },
    (_, i) => interests.slice(i * 3, i * 3 + 3)
  );
  const toggleInterest = (item: any) => {
    setSelected((prevSelected: any) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i: any) => i !== item)
        : [...prevSelected, item]
    );
  };

  const canContinue = selected.length >= 3;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleContinue = () => {
    navigation.navigate("BottomTabNavigator");
  };

  return (
    <View
      style={[
        styles.interestsContainer,
        {
          backgroundColor:
            theme === "dark"
              ? colors.darkPrimaryBackground
              : colors.primaryBackground,
        },
      ]}
    >
      <View style={styles.headingContainer}>
        <Text
          style={[
            styles.heading,
            {
              color:
                theme === "dark"
                  ? colors.darkPrimaryText
                  : colors.quaternaryText,
            },
          ]}
        >
          Choose Your Interests
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              color:
                theme === "dark"
                  ? colors.darkPrimaryText // pick a muted light color
                  : colors.tertiaryText, // pick a muted dark color
            },
          ]}
        >
          Choose at least 3 fields
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardsContainer}>
          {groupedInterests.map((group: any, rowIndex: any) => (
            <View key={rowIndex} style={styles.cardRow}>
              {group.map((item: any) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => toggleInterest(item)}
                  style={[
                    styles.cardDimension,
                    selected.includes(item) && styles.cardSelected,
                    {
                      backgroundColor: selected.includes(item)
                        ? theme === "dark"
                          ? colors.darkSeptenaryBackground
                          : colors.splashBackground
                        : theme === "dark"
                        ? colors.darkSenaryBackground
                        : colors.quaternaryBackground,
                      borderColor:
                        selected.includes(item) && theme === "dark"
                          ? colors.quindenaryBackground
                          : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.cardText,
                      {
                        color:
                          theme === "dark"
                            ? colors.darkPrimaryText
                            : colors.primaryText,
                      },
                      selected.includes(item) && styles.cardNameSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.continueButton,
          !canContinue && styles.continueButtonDisabled,
        ]}
        onPress={() => {
          if (canContinue) {
            handleContinue(); // navigate next

            showToast("Your interests saved successfully", "success");
          } else {
            // 🚫 not enough selections
            if (Platform.OS === "android") {
              ToastAndroid.show(
                "Please choose at least 3 fields",
                ToastAndroid.SHORT
              );
            } else {
              showMessage?.({
                message: "Please choose at least 5 fields",
                type: "warning",
              });
            }
          }
        }}
      >
        <Text
          style={[
            styles.continueText,
            {
              color:
                theme === "dark"
                  ? colors.darkPrimaryText
                  : colors.tertiaryBackground,
              opacity: !canContinue ? 0.4 : 1,
            },
          ]}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  interestsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.nonaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  headingContainer: {
    marginTop: 30,
    paddingBottom: 10,
    alignItems: "flex-start",
    width: "100%",
  },
  heading: {
    fontSize: 32,
    fontFamily: fontFamily.Cabinet700,
    textAlign: "left",
    color: colors.quaternaryText,
  },
  paragraph: {
    fontSize: 16,
    color: colors.octonaryText,
    fontFamily: fontFamily.Satoshi400,
  },
  cardsContainer: {
    marginTop: 20,
    // flexDirection: "row",
    rowGap: 12,
  },
  cardRow: {
    flexDirection: "row",
    columnGap: 12,
  },
  cardDimension: {
    width: width * 0.28,
    height: 110,
    backgroundColor: colors.quaternaryBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  cardText: {
    fontFamily: fontFamily.Satoshi500,
    textAlign: "center",
    fontSize: 14,
    color: colors.primaryBorderColor,
  },
  cardSelected: {
    backgroundColor: colors.splashBackground, // pick a strong active color
  },
  cardNameSelected: {
    color: colors.primaryBackground, // darker/contrast text color
  },
  continueButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.primaryText,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
  },
  continueText: {
    color: colors.tertiaryBackground,
    fontSize: 20,
    fontFamily: fontFamily.Cabinet700,
  },
  continueButtonDisabled: {
    backgroundColor: colors.primaryText, // Use a lighter/disabled tone
    color: colors.primaryText,
    opacity: 0.2,
  },
});
