import React, { useContext, useState } from "react";
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
const QuestionBlock = ({
  title,
  options,
  selectedValue,
  onSelect,
  theme,
  message,
}: {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  message: string;
  theme: string;
}) => (
  <View style={styles.titleoptioncontainer}>
    <Text style={[globalStyles.title(theme)]}>{title}</Text>
    <Text
      style={[
        {
          color:
            theme === "dark" ? colors.darkSenaryText : colors.novemdenaryText,
        },
      ]}
    >
      {message}
    </Text>
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
      {options.map((option, index) => {
        const value = option;
        const isSelected = selectedValue === value;

        return (
          <TouchableOpacity
            key={value}
            onPress={() => onSelect(value)}
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
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const TellUsSomething = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openRole, setOpenRole] = useState(false);
  const [openGoal, setOpenGoal] = useState(false);
  const [selectedWhoAreYou, setSelectedWhoAreYou] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const progress = !showSecondQuestion ? 0.5 : 1;

  const roles = ["Student", "Professional", "Business Owner", "Retired"];
  const goals = [
    "Stay updated",
    "Learn about market",
    "Track market trends",
    "Get expert opinions",
  ];
  const isFormValid = showSecondQuestion
    ? selectedGoal !== ""
    : selectedWhoAreYou !== "";

  const handleNextOrContinue = () => {
    if (!showSecondQuestion) {
      setShowSecondQuestion(true);
    } else {
      navigation.navigate("ChooseYourInterests");
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[globalStyles.pageContainerWithBackground(theme)]}>
        <View style={[styles.topContainer]}>
          <View>
            {showSecondQuestion && (
              <TouchableOpacity
                onPress={() => {
                  setShowSecondQuestion(false);
                }}
              >
                {theme === "dark" ? <BackArrowWhite /> : <BackArrow />}
              </TouchableOpacity>
            )}
          </View>
          <View>
            {/* <TouchableOpacity>
              <Text
                style={[
                  styles.emailText,
                  {
                    color:
                      theme === "dark"
                        ? colors.darkSeptanaryText
                        : colors.sexdenaryText,
                  },
                ]}
              >
                Skip
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={progress}
            color={colors.sexdenaryText}
            style={styles.progressBar}
          />
        </View>
        {!showSecondQuestion && (
          <QuestionBlock
            title="Tell us a bit about you?"
            message="Helps us know you better and make your experience more relevant."
            options={roles}
            selectedValue={selectedWhoAreYou}
            onSelect={setSelectedWhoAreYou}
            theme={theme}
          />
        )}

        {showSecondQuestion && (
          <QuestionBlock
            title="What bring you here ?"
            message="We’ll customize your news and insights based on your interests"
            options={goals}
            selectedValue={selectedGoal}
            onSelect={setSelectedGoal}
            theme={theme}
          />
        )}

        <Button
          title={showSecondQuestion ? "Continue" : "Next"}
          onPress={handleNextOrContinue}
          disabled={!isFormValid}
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
    bottom: 60,
    left: 20,
    width: "100%",
  },
  optionsWrapper: {
    flexDirection: "column", // use "row" if you want them side by side
    gap: 12,
    marginBottom: 200,
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
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 60,
    marginBottom: 60,
    width: "100%",
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
  },
});
