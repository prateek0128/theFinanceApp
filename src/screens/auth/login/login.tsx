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
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { colors } from "../../../assets/styles/colors";
import globalStyles from "../../../assets/styles/globalStyles";
import typography from "../../../assets/styles/typography";
const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = () => {
    // TODO: Replace this with actual login logic (API call or Firebase)
    if (form.email === "" || form.password === "") {
      alert("Please fill all fields");
      return;
    }

    alert("Login successful!");
    navigation.navigate("Home"); // Replace with actual authenticated screen
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Let’s get you started</Text>

        <Text style={styles.subtitle}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.inlineLinkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.alreadyLinkText}>Dont have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.loginLinkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  innerContainer: {
    padding: 20,
    //justifyContent: "center",
    paddingTop: 150,
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
  linkText: {
    textAlign: "center",
    color: "#007AFF",
    marginTop: 16,
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
});
