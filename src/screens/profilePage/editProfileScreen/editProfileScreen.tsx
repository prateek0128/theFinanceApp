import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import fontFamily from "../../../assets/styles/fontFamily";
import { ThemeContext } from "../../../context/themeContext";
import { colors } from "../../../assets/styles/colors";
import { RootStackParamList } from "../../../types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  BackArrow,
  BackArrowWhite,
} from "../../../assets/icons/components/logIn";
import Header from "../../../components/header/header";
import globalStyles from "../../../assets/styles/globalStyles";

export default function EditProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expertiseLevel, setExpertiseLevel] = useState("");

  // Simulate API fetch
  useEffect(() => {
    setTimeout(() => {
      // Mock API response
      setFullName("Ian Davis");
      setDob("05/08/1998");
      setEmail("iandavisyippie@gmail.com");
      setPassword("Hello@123");
      setAvatar("https://randomuser.me/api/portraits/men/32.jpg");
      setLoading(false);
    }, 1000);
  }, []);

  // Handle Image Selection
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };
  // Handle Save Changes
  const handleSave = () => {
    setSaving(true);
    // Mock API save
    setTimeout(() => {
      console.log("Saved:", { fullName, dob, email, password, avatar });
      setSaving(false);
      alert("Profile updated successfully!");
    }, 1500);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <ScrollView
      style={[globalStyles.pageContainerWithBackground(theme)]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.arrowSavedContainer}>
        <Header
          onBackClick={() => {
            navigation.navigate("Profile", {
              screen: "ProfileStack",
            });
          }}
        />
      </View>
      <View style={styles.subContainer}>
        {/* Profile Image */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.form,
            {
              backgroundColor:
                theme === "dark"
                  ? colors.octodenaryText
                  : colors.primaryBackground,
            },
          ]}
        >
          <View style={styles.Fields}>
            <Text
              style={[
                styles.label,
                {
                  color:
                    theme === "dark"
                      ? colors.darkPrimaryText
                      : colors.octodenaryText,
                },
              ]}
            >
              Full Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor:
                    theme === "dark" ? colors.octodenaryText : colors.white,
                  color:
                    theme === "dark"
                      ? colors.darkSenaryText
                      : colors.unvigintaryText,
                },
              ]}
              placeholder="Enter your full name"
              placeholderTextColor={
                theme === "dark"
                  ? colors.darkSenaryText
                  : colors.unvigintaryText
              }
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* <Text
          style={[
            styles.label,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          Date of Birth
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor:
                theme === "dark" ? colors.octodenaryText : colors.white,
              color:
                theme === "dark"
                  ? colors.darkSenaryText
                  : colors.unvigintaryText,
            },
          ]}
          value={dob}
          onChangeText={setDob}
        /> */}

          <View style={styles.Fields}>
            <Text
              style={[
                styles.label,
                {
                  color:
                    theme === "dark" ? colors.white : colors.octodenaryText,
                },
              ]}
            >
              Expertise Level
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor:
                    theme === "dark" ? colors.octodenaryText : colors.white,
                  color:
                    theme === "dark"
                      ? colors.darkSenaryText
                      : colors.unvigintaryText,
                },
              ]}
              placeholder="Enter your expertise level"
              placeholderTextColor={
                theme === "dark"
                  ? colors.darkSenaryText
                  : colors.unvigintaryText
              }
              value={expertiseLevel}
              onChangeText={setExpertiseLevel}
            />
          </View>

          <View style={styles.Fields}>
            <Text
              style={[
                styles.label,
                {
                  color:
                    theme === "dark" ? colors.white : colors.octodenaryText,
                },
              ]}
            >
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor:
                    theme === "dark" ? colors.octodenaryText : colors.white,
                  color:
                    theme === "dark"
                      ? colors.darkSenaryText
                      : colors.unvigintaryText,
                },
              ]}
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>

          {/* <Text
          style={[
            styles.label,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          Password
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor:
                theme === "dark" ? colors.octodenaryText : colors.white,
              color:
                theme === "dark"
                  ? colors.darkSenaryText
                  : colors.unvigintaryText,
            },
          ]}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        /> */}
        </View>
      </View>
      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, saving && { opacity: 0.6 }]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subContainer: { gap: 40 },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: "38%",
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  form: {
    gap: 24,
  },
  formContainer: { gap: 40 },
  header: {
    fontSize: 32,
    fontFamily: fontFamily.Inter700,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    fontFamily: fontFamily.Inter500,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#E3E5E5",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    gap: 10,
  },
  arrowSavedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    paddingTop: 50, // space for status bar
    paddingBottom: 16,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 0,
  },
  saveButton: {
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#6B4EFF",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: fontFamily.Inter400,
  },
  Fields: { gap: 12 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
