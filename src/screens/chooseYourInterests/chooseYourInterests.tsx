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
import {
  getAllInterests,
  submitOnboarding,
} from "../../apiServices/onboarding";
import { AxiosError } from "axios";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import { getUserProfile, updateUserInterest } from "../../apiServices/user";
import Loader from "../../components/Loader/loader";
import { useBackPressNavigate } from "../../hooks/useBackPressNavigate";
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
type ChooseYourInterestsRouteProp = RouteProp<
  RootStackParamList,
  "ChooseYourInterests"
>;
type BottomTabNavigatorRouteProp = RouteProp<
  RootStackParamList,
  "BottomTabNavigator"
>;
export default function ChooseYourInterests() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<string[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterestIds, setSelectedInterestIds] = useState<string[]>([]);
  const [updateInterests, setUpdateInterest] = useState<string[]>([]);
  const route = useRoute<
    ChooseYourInterestsRouteProp | BottomTabNavigatorRouteProp
  >();
  const expertiseLevel =
    route.params && "expertiseLevel" in route.params
      ? (route.params as { expertiseLevel?: string | null }).expertiseLevel
      : undefined;
  const toggleInterest = (item: any) => {
    setSelected((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (selectedItem: any) => selectedItem.id === item.id
      );

      const updatedSelected = isAlreadySelected
        ? prevSelected.filter((i: any) => i.id !== item.id)
        : [...prevSelected, item];

      // Update interest IDs as well
      const updatedIds = updatedSelected.map((i) => i.interestId);
      setSelectedInterestIds(updatedIds);
      setUpdateInterest(updatedSelected.map((i) => i.name));
      return updatedSelected;
    });
  };
  const canContinue = selected.length >= 3;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleContinue = async () => {
    const onboardingData = {
      experience_level: expertiseLevel,
      interests: selectedInterestIds,
      clientMeta: {
        deviceId: Device.osInternalBuildId ?? Device.modelId ?? "unknown",
        locale: Localization.getLocales()[0].languageTag,
        tz: Localization.getCalendars?.()[0]?.timeZone ?? "Asia/Kolkata",
      },
    };
    console.log("OnboardingDataPayload=>", onboardingData);
    try {
      const response = await submitOnboarding(onboardingData);
      console.log("OnboardingResponse=>", response.data);
      showToast(response.data.message, "success");
      navigation.navigate("BottomTabNavigator");
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
      return;
    }
  };
  const getAllInterestsAPI = async () => {
    setIsLoading(true);
    try {
      const response = await getAllInterests();
      console.log("InterestsResponse=>", response.data.data);
      setInterests(response.data.data);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
    } finally {
      setIsLoading(false);
    }
  };
  const getUserProfileAPI = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      console.log("SelectedInterestsResponse=>", response.data.interests);
      const userInterests = response.data.interests || [];
      setSelectedInterests(userInterests);

      // If user already has saved interests, it's not first time
      if (userInterests.length > 0) {
        setIsFirstTime(false);
      }
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateInterestsAPI = async () => {
    const interestsData: string[] = updateInterests;
    try {
      const response = await updateUserInterest(interestsData);
      console.log("UpdateRespone=>", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInterestsAPI();
    getUserProfileAPI();
  }, []);
  const groupedInterests = interests
    ? Array.from({ length: Math.ceil(interests.length / 3) }, (_, i) =>
        interests.slice(i * 3, i * 3 + 3)
      )
    : [];
  const buttonTitle = isFirstTime ? "Get Started" : "Update Interests";
  console.log("GroupInterests=>", groupedInterests);
  console.log("SelectedInterests=>", selectedInterests);
  console.log("SelectedInterests2=>", selected);
  console.log("SelectedInterests3=>", updateInterests);

  // Add this useEffect to map API-selected names to your full interest objects
  useEffect(() => {
    if (interests.length && selectedInterests.length) {
      const matched = interests.filter((item) =>
        selectedInterests.includes(item.name)
      );
      setSelected(matched); // This ensures toggleInterest highlighting works
      setSelectedInterestIds(matched.map((i) => i.interestId));
    }
  }, [interests, selectedInterests]);
  selectedInterestIds.length < 0 &&
    useBackPressNavigate("BottomTabNavigator", {});
  return (
    <View style={{ flex: 1 }}>
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
                {group.map((item: any, index: any) => (
                  <TouchableOpacity
                    key={item.id}
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
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
        <Button
          title={isLoading ? "Please wait..." : buttonTitle}
          onPress={async () => {
            if (selected.length >= 3) {
              setIsLoading(true);
              try {
                if (isFirstTime) {
                  await handleContinue();
                } else {
                  await handleContinue();
                  // await handleUpdateInterestsAPI();
                }
                showToast("Your interests saved successfully", "success");
              } catch (error) {
                console.error(error);
                showToast("Something went wrong", "danger");
              } finally {
                setIsLoading(false);
              }
            } else {
              showToast("Please choose at least 3 fields", "warning");
            }
          }}
          disabled={isLoading}
          buttonStyle={{ marginBottom: 20 }}
        />
      </View>
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
    columnGap: 10,
  },
  cardDimension: {
    //flex: 1,
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
