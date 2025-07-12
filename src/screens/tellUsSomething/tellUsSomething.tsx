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
import {
  BackArrowIcon,
  BackArrowIconWhite,
} from "../../assets/icons/components/header";
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
    <Text
      style={[
        styles.title,
        {
          color:
            theme === "dark" ? colors.darkPrimaryText : colors.quindenaryText,
        },
      ]}
    >
      {title}
    </Text>
    <Text
      style={[
        "",
        {
          color: theme === "dark" ? colors.darkPrimaryText : colors.primaryText,
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
                      ? "#BFDBFE"
                      : colors.primaryBackground
                    : isSelected
                    ? colors.darkSenaryBackground
                    : colors.undenaryBackground,
                borderColor: isSelected ? "#1D4ED8" : colors.quinaryBorderColor,
              },
            ]}
          >
            <Text
              style={{
                color:
                  theme === "light"
                    ? isSelected
                      ? "#1D4ED8"
                      : colors.undenaryBackground
                    : isSelected
                    ? "#1D4ED8"
                    : colors.white,
                fontFamily: fontFamily.Satoshi500,
                fontSize: 16,
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

  const roles = ["Student", "Professional", "Business Owner", "Retired"];
  const goals = [
    "Long-term Investing",
    "Day Trading",
    "Portfolio Tracking",
    "Market Research",
  ];
  const isFormValid = showSecondQuestion
    ? selectedGoal !== ""
    : selectedWhoAreYou !== "";

  const handleNextOrSubmit = () => {
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
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              theme === "dark"
                ? colors.darkPrimaryBackground
                : colors.primaryBackground,
          },
        ]}
      >
        <View
          style={[
            styles.questioncontainer,
            {
              backgroundColor:
                theme === "dark"
                  ? colors.darkPrimaryBackground
                  : colors.primaryBackground,
            },
          ]}
        >
          <View style={styles.questionText}>
            {showSecondQuestion && (
              <TouchableOpacity
                onPress={() => {
                  // Go back to Question 1
                  setShowSecondQuestion(false);
                  setSelectedGoal(""); // Optional: reset second selection
                }}
                style={styles.backButton}
              >
                {/* Replace this with your icon or SVG */}
                <View>
                  {theme === "light" ? (
                    <BackArrowIcon />
                  ) : (
                    <BackArrowIconWhite />
                  )}
                </View>
              </TouchableOpacity>
            )}
            <Text
              style={[
                styles.questionText,
                {
                  color:
                    theme === "dark"
                      ? colors.darkPrimaryText
                      : colors.primaryText,
                },
              ]}
            >
              {showSecondQuestion ? "Question 2 of 2" : "Question 1 of 2"}
            </Text>
          </View>
        </View>

        {!showSecondQuestion && (
          <QuestionBlock
            title="What is your Role"
            message="Choose Your Role"
            options={roles}
            selectedValue={selectedWhoAreYou}
            onSelect={setSelectedWhoAreYou}
            theme={theme}
          />
        )}

        {showSecondQuestion && (
          <QuestionBlock
            title="What is your Goal"
            message="Choose your goal"
            options={goals}
            selectedValue={selectedGoal}
            onSelect={setSelectedGoal}
            theme={theme}
          />
        )}

        <Button
          title={showSecondQuestion ? "Submit" : "Next"}
          onPress={handleNextOrSubmit}
          disabled={!isFormValid}
          buttonStyle={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

export default TellUsSomething;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primaryBackground,
    //justifyContent: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: fontFamily.Cabinet700,
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
    borderRadius: 12,
    borderWidth: 1,
  },
  questioncontainer: {
    flexDirection: "column", // use "row" if you want them side by side
    gap: 12,
    marginTop: 50,
    marginBottom: 60,
  },
  questionText: {
    flexDirection: "row",
    gap: 6,
  },
  backButton: {
    gap: 6,
  },
  backButtonText: {},
});
