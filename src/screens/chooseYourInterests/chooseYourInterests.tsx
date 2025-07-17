import React, { useState, useContext, useEffect } from "react";
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
import Button from "../../components/button/button";
import globalStyles from "../../assets/styles/globalStyles";
import { getAllInterests } from "../../apiServices/onboarding";
import { AxiosError } from "axios";
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
    console.log("Inside handleContinue");

    if (!canContinue) {
      showToast("Please select at least 3 intersest", "warning");
      return;
    }
    showToast("Your interests saved successfully", "success");
    navigation.navigate("BottomTabNavigator");
  };
  const getAllInterestsAPI = async () => {
    try {
      const response = await getAllInterests();
      console.log("InterestsResponse=>", response.data);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
    }
  };
  useEffect(() => {
    getAllInterestsAPI();
  }, []);
  return (
    <View
      style={[
        globalStyles.pageContainerWithBackground(theme),
        styles.interestsContainer,
      ]}
    >
      <View style={styles.headingContainer}>
        <Text style={[globalStyles.title(theme)]}>Choose Your Interests</Text>
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
                      backgroundColor:
                        theme == "light"
                          ? selected.includes(item)
                            ? colors.septendenaryBackground
                            : colors.octodenaryBackground
                          : selected.includes(item)
                          ? colors.darkDuodenaryBackground
                          : "transparent",
                      borderColor:
                        theme === "light"
                          ? selected.includes(item)
                            ? colors.sexdenaryText
                            : "transparent"
                          : selected.includes(item)
                          ? "transparent"
                          : colors.darkUndenaryBackground,
                      borderWidth:
                        theme === "dark" && selected.includes(item) ? 0 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.cardText,
                      {
                        color:
                          theme == "light"
                            ? selected.includes(item)
                              ? colors.sexdenaryText
                              : colors.octodenaryText
                            : selected.includes(item)
                            ? colors.vigenaryText
                            : colors.white,
                        fontFamily: selected.includes(item)
                          ? fontFamily.Inter700
                          : fontFamily.Inter400,
                      },
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
      <Button
        title="Get Started"
        onPress={() => {
          if (selected.length >= 3) {
            handleContinue(); // navigate next
            showToast("Your interests saved successfully", "success");
          } else {
            console.log("Please choose at least 3 fields");
            showToast("Please choose at least 3 fields", "warning");
          }
        }}
        // disabled={!canContinue}
        buttonStyle={{ marginBottom: 20 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  interestsContainer: {
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
    fontFamily: fontFamily.Inter700,
    textAlign: "left",
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
    width: width * 0.27,
    height: 108,
    // backgroundColor: colors.quaternaryBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    //borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  cardText: {
    fontFamily: fontFamily.Inter400,
    textAlign: "center",
    fontSize: 14,
    //color: colors.primaryBorderColor,
  },
  cardSelected: {
    // backgroundColor: colors.splashBackground, // pick a strong active color
  },
  cardNameSelected: {
    // color: colors.primaryBackground, // darker/contrast text color
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
