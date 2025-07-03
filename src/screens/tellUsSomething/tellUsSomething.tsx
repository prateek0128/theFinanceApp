import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { colors } from "../../assets/styles/colors";
const TellUsSomething = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedWhoAreYou, setSelectedWhoAreYou] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = () => {
    Alert.alert(
      "Submitted",
      `Role: ${selectedWhoAreYou}\nGoal: ${selectedGoal}\nCategory: ${selectedCategory}`
    );
    // You can also do something like:
    // navigation.navigate("NextScreen", { role: selectedOption1, goal: selectedOption2, category: selectedOption3 });
    navigation.navigate("ChooseYourInterests");
  };

  const isFormValid =
    selectedWhoAreYou !== "" && selectedGoal !== "" && selectedCategory !== "";
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell Us Something About Yourself</Text>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Who are you?</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedWhoAreYou}
            onValueChange={(itemValue) => {
              setSelectedWhoAreYou(itemValue);
              setSelectedGoal(""); // Reset dependent fields
              setSelectedCategory("");
            }}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            {roles.map((role) => (
              <Picker.Item
                key={role.value}
                label={role.label}
                value={role.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Goal</Text>
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
            style={styles.picker}
            dropdownIconColor="#333"
          >
            <Picker.Item label="Select your goal" value="" />
            <Picker.Item label="Long-term Investing" value="long_term" />
            <Picker.Item label="Day Trading" value="day_trading" />
            <Picker.Item label="Portfolio Tracking" value="tracking" />
            <Picker.Item label="Market Research" value="research" />
          </Picker>
        </View>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Categories</Text>
        <View
          style={[styles.pickerWrapper, !selectedGoal && styles.disabledPicker]}
        >
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            enabled={!!selectedGoal}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            <Picker.Item label="Select a sector" value="" />
            <Picker.Item label="Technology" value="technology" />
            <Picker.Item label="Healthcare" value="healthcare" />
            <Picker.Item label="Energy" value="energy" />
            <Picker.Item label="Finance" value="finance" />
            <Picker.Item label="Consumer Goods" value="consumer_goods" />
          </Picker>
        </View>
      </View>

      {/* Submit Button */}
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={!isFormValid}
          color={isFormValid ? colors.primaryButtonColor : "#ccc"}
        />
      </View> */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!isFormValid}
        style={[
          styles.submitButton,
          !isFormValid && styles.submitButtonDisabled,
        ]}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 32,
    textAlign: "center",
  },
  dropdownContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  picker: {
    height: Platform.OS === "ios" ? 200 : 50,
    width: "100%",
    paddingHorizontal: 10,
  },
  //   picker: {
  //     height: 50,
  //     borderWidth: 1,
  //     borderColor: "#ccc",
  //     backgroundColor: "#f0f0f0",
  //   },
  disabledPicker: {
    opacity: 0.5,
  },
  buttonContainer: {
    marginTop: 40,
  },
  submitButton: {
    backgroundColor: colors.primaryButtonColor,
    paddingVertical: 14,
    borderRadius: 8,
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
