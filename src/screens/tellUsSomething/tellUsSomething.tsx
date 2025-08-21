import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import Button from "../../components/button/button";
import { ThemeContext } from "../../context/themeContext";
import { BackArrow, BackArrowWhite } from "../../assets/icons/components/logIn";
import globalStyles from "../../assets/styles/globalStyles";
import { ProgressBar, MD3Colors } from "react-native-paper";
import { AxiosError } from "axios";
import showToast from "../../utilis/showToast";
import {
  getAllGoals,
  getAllInterests,
  getAllRoles,
} from "../../apiServices/onboarding";
import { getComments } from "../../apiServices/newsEngagement";
import { useBackPressNavigate } from "../../hooks/useBackPressNavigate";
const QuestionBlock = ({
  title,
  options,
  selectedValue,
  onSelect,
  theme,
  message,
}: {
  title: string;
  options: { key: string; value: string }[]; // array of objects like [{ key: "beginner", value: "Beginner" }, ...]
  selectedValue: string;
  onSelect: (value: string) => void;
  message: string;
  theme: string;
}) => (
  <View style={styles.titleoptioncontainer}>
    <Text style={[globalStyles.title(theme)]}>{title}</Text>
    <Text
      style={{
        color:
          theme === "dark" ? colors.darkSenaryText : colors.novemdenaryText,
      }}
    >
      {message}
    </Text>
    <ScrollView style={{ flexGrow: 1 }}>
      <View
        style={[
          styles.optionsWrapper,
          {
            backgroundColor:
              theme === "dark"
                ? colors.darkPrimaryBackground
                : colors.primaryBackground,
          },
        ]}
      >
        {options.map((option) => {
          const isSelected = selectedValue === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              onPress={() => onSelect(option.key)}
              style={[
                styles.optionBox,
                {
                  backgroundColor:
                    theme === "light"
                      ? isSelected
                        ? colors.septendenaryBackground
                        : colors.primaryBackground
                      : isSelected
                      ? colors.darkUndenaryBackground
                      : "transparent",
                  borderColor:
                    theme === "light"
                      ? isSelected
                        ? colors.denaryBorder
                        : colors.nonaryBorder
                      : isSelected
                      ? "transparent"
                      : colors.tertiaryButtonColor,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    theme === "light"
                      ? isSelected
                        ? colors.sexdenaryText
                        : colors.octodenaryText
                      : isSelected
                      ? colors.darkSeptanaryText
                      : colors.white,
                  fontFamily: isSelected
                    ? fontFamily.Inter700
                    : fontFamily.Inter400,
                }}
              >
                {option.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  </View>
);

const TellUsSomething = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [selectedExpertLevel, setSelectedExpertLevel] = useState<any>(null);
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const progress = !showSecondQuestion ? 0.5 : 1;
  const handleNextOrContinue = () => {
    if (!setSelectedExpertLevel || selectedExpertLevel === "") {
      showToast("Please select your experience level.", "warning");
      return;
    }
    navigation.navigate("ChooseYourInterests", {
      expertiseLevel: selectedExpertLevel,
    });
    // navigation.navigate("BottomTabNavigator");
  };
  const expertiseLevel = [
    { key: "novice", value: "Novice" },
    { key: "beginner", value: "Beginner" },
    { key: "intermediate", value: "Intermediate" },
    { key: "expert", value: "Expert" },
  ];
  console.log("expertiseLevel:", selectedExpertLevel);
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={[
          globalStyles.pageContainerWithBackground(theme),
          { paddingTop: 80 },
        ]}
      >
        <QuestionBlock
          title="What's your experience level?"
          message="Select the one that best matches your skill."
          options={expertiseLevel || []}
          selectedValue={selectedExpertLevel}
          onSelect={(option) => setSelectedExpertLevel(option)}
          theme={theme}
        />
        <Button
          title={"Continue"}
          onPress={handleNextOrContinue}
          disabled={selectedExpertLevel !== "" ? false : true}
          buttonStyle={[
            styles.submitButton,
            {
              backgroundColor:
                theme === "light" ? colors.sexdenaryText : colors.sexdenaryText,
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default TellUsSomething;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: fontFamily.Inter700,
    color: colors.quindenaryText,
  },
  titleoptioncontainer: {
    gap: 27,
  },
  submitButton: {
    position: "absolute",
    bottom: 40,
    left: 20,
    width: "100%",
  },
  optionsWrapper: {
    flexDirection: "column", // use "row" if you want them side by side
    gap: 12,
    // marginBottom: 200,
  },
  optionBox: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 48,
    borderWidth: 1,
  },
  backButton: {
    gap: 6,
  },

  emailText: {
    fontSize: 16,
    color: colors.sexdenaryText,
    fontFamily: fontFamily.Inter400,
    textAlign: "right",
  },
  progressBar: {
    height: 4,
  },
  progressContainer: {
    backgroundColor: "#eee", // unfilled color
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
});
