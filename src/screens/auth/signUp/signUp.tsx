import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { colors } from "../../../assets/styles/colors";
import globalStyles from "../../../assets/styles/globalStyles";
import typography from "../../../assets/styles/typography";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignUp = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Send `form` data to backend or Firebase
    alert("Sign up successful!");
    navigation.navigate("Login"); // Navigate to login after successful sign up
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Let’s get you started</Text>
        <Text style={styles.subtitle}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.inlineLinkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.alreadyLinkText}>Already have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLinkText}>Log In</Text>
          </TouchableOpacity>
        </View>
        {/* Icons row */}
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => console.log("Google pressed")}>
            <FontAwesome
              name="google"
              size={32}
              color="#DB4437"
              style={styles.icon}
            />
            {/* <Image
              source={require("../../../assets/images/auth/googleIcon.svg")} // Replace with your logo path
              style={styles.icon}
              resizeMode="contain"
            /> */}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Facebook pressed")}>
            <FontAwesome
              name="apple"
              size={32}
              color="#4267B2"
              style={styles.icon}
            />
            {/* <Image
              source={require("../../../assets/images/auth/appleIcon.svg")} // Replace with your logo path
              style={styles.icon}
              resizeMode="contain"
            /> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 24,
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    color: colors.primaryText,
    fontFamily: typography.fontFamily.secondary,
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 80,
    textAlign: "left",
  },
  subtitle: {
    color: colors.primaryText,
    fontFamily: typography.fontFamily.secondary,
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 36,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    gap: 10,
    color: colors.primaryText,
    fontFamily: typography.fontFamily.secondary,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inlineLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  alreadyLinkText: {
    textAlign: "center",
    fontWeight: 300,
    fontSize: 14,
    color: colors.primaryText,
    fontFamily: typography.fontFamily.secondary,
  },
  loginLinkText: {
    textAlign: "center",
    marginLeft: 4,
    fontWeight: 600,
    fontSize: 16,
    color: colors.primaryText,
    fontFamily: typography.fontFamily.secondary,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 20, // if using React Native >= 0.71
  },
  icon: {
    marginHorizontal: 10,
  },
});
