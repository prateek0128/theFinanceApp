import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import Button from "../../components/button/button";
import DropDownPicker from "react-native-dropdown-picker";
import { ThemeContext } from "../../context/themeContext";
const TellUsSomething = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openRole, setOpenRole] = useState(false);
  const [openGoal, setOpenGoal] = useState(false);
  const [selectedWhoAreYou, setSelectedWhoAreYou] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = () => {
    // navigation.navigate("NextScreen", { role: selectedOption1, goal: selectedOption2, category: selectedOption3 });
    navigation.navigate("ChooseYourInterests");
  };

  const isFormValid = selectedWhoAreYou !== "" && selectedGoal !== "";
  const roles = [
    { label: "Select your role", value: "" },
    { label: "Student", value: "student" },
    { label: "Professional", value: "professional" },
    { label: "Business Owner", value: "business_owner" },
    { label: "Retired", value: "retired" },
  ];
  const goals = [
    { label: "Select your goal", value: "" },
    { label: "Long-term Investing", value: "long_term" },
    { label: "Day Trading", value: "day_trading" },
    { label: "Portfolio Tracking", value: "tracking" },
    { label: "Market Research", value: "research" },
  ];
  const [roles2, setRoles2] = useState([
    { label: "Select your role", value: "" },
    { label: "Student", value: "student" },
    { label: "Professional", value: "professional" },
    { label: "Business Owner", value: "business_owner" },
    { label: "Retired", value: "retired" },
  ]);
  const [goals2, setGoals2] = useState([
    { label: "Select your goal", value: "" },
    { label: "Long-term Investing", value: "long_term" },
    { label: "Day Trading", value: "day_trading" },
    { label: "Portfolio Tracking", value: "tracking" },
    { label: "Market Research", value: "research" },
  ]);
  return (
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
      <Text
        style={[
          styles.title,
          {
            color:
              theme === "dark" ? colors.darkPrimaryText : colors.quindenaryText,
          },
        ]}
      >
        Tell Us Something About Yourself
      </Text>
      <View style={styles.dropdownContainer}>
        <Text
          style={[
            styles.label,
            {
              color:
                theme === "dark"
                  ? colors.darkPrimaryText
                  : colors.undenaryBackground,
            },
          ]}
        >
          What is your Role ?
        </Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedWhoAreYou}
            onValueChange={(itemValue) => {
              setSelectedWhoAreYou(itemValue);
              setSelectedGoal(""); // Reset dependent fields
              setSelectedCategory("");
            }}
            style={[
              styles.picker,
              {
                color:
                  theme === "dark"
                    ? colors.darkPrimaryText
                    : colors.undenaryBackground,
              },
            ]}
            dropdownIconColor={
              theme === "dark"
                ? colors.darkPrimaryText
                : colors.undenaryBackground
            }
          >
            {roles.map((role) => (
              <Picker.Item
                key={role.value}
                label={role.label}
                value={role.value}
              />
            ))}
          </Picker>
          {/* <DropDownPicker
            open={openRole}
            value={selectedWhoAreYou}
            items={roles}
            setOpen={setOpenRole}
            setValue={(callback) => {
              setSelectedWhoAreYou(callback(selectedWhoAreYou));
              setSelectedGoal(""); // Reset dependent fields
              setSelectedCategory("");
            }}
            setItems={setRoles2}
            placeholder="Select your role"
          /> */}
        </View>
      </View>

      <View style={styles.dropdownContainer}>
        <Text
          style={[
            styles.label,
            {
              color:
                theme === "dark"
                  ? colors.darkPrimaryText
                  : colors.undenaryBackground,
            },
          ]}
        >
          What is your goal for using this app
        </Text>
        <View
          style={[
            styles.pickerWrapper,
            !selectedWhoAreYou && styles.disabledPicker,
          ]}
        >
          <Picker
            selectedValue={selectedGoal}
            onValueChange={(itemValue) => {
              setSelectedGoal(itemValue);
              setSelectedCategory(""); // Reset dependent field
            }}
            enabled={!!selectedWhoAreYou}
            style={[
              styles.picker,
              {
                color:
                  theme === "dark"
                    ? colors.darkPrimaryText
                    : colors.undenaryBackground,
              },
            ]}
            dropdownIconColor={
              theme === "dark"
                ? colors.darkPrimaryText
                : colors.undenaryBackground
            }
          >
            <Picker.Item label="Select your goal" value="" />
            <Picker.Item label="Long-term Investing" value="long_term" />
            <Picker.Item label="Day Trading" value="day_trading" />
            <Picker.Item label="Portfolio Tracking" value="tracking" />
            <Picker.Item label="Market Research" value="research" />
          </Picker>
          {/* <DropDownPicker
            open={openGoal}
            value={selectedGoal}
            items={goals}
            setOpen={setOpenGoal}
            setValue={(callback) => {
              setSelectedGoal(callback(selectedGoal));
              setSelectedCategory("");
            }}
            setItems={setGoals2}
            disabled={!selectedWhoAreYou}
            placeholder="Select your goal"
          /> */}
        </View>
      </View>
      <Button title={"Submit"} onPress={handleSubmit} disabled={!isFormValid} />
    </View>
  );
};

export default TellUsSomething;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primaryBackground,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: fontFamily.Cabinet700,
    color: colors.quindenaryText,
  },
  dropdownContainer: {
    marginBottom: 40,
    gap: 10,
  },
  label: {
    fontSize: 20,
    fontFamily: fontFamily.Cabinet700,
    color: colors.undenaryBackground,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.quinaryBorderColor,
    borderRadius: 8,
    gap: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: fontFamily.Satoshi500,
    color: colors.undenaryBackground,
  },
  disabledPicker: {
    opacity: 0.5,
  },
  buttonContainer: {
    marginTop: 100,
  },
  submitButton: {
    backgroundColor: colors.primaryButtonColor,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
