import React, { use, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import {
  DarkHelp,
  DarkMyintresetIcon,
  DarkProfileIcon,
  DarkSavedIcon,
  DarkSetting,
  EditProfileIcon,
  HelpIcon,
  MyIntrestIcon,
  SavedIcon,
  SettingIcon,
  ForwardIcon,
} from "../../assets/icons/components/Profile";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import fontFamily from "../../assets/styles/fontFamily";
import { ThemeContext } from "../../context/themeContext";
import { BackArrow, BackArrowWhite } from "../../assets/icons/components/logIn";
import { colors } from "../../assets/styles/colors";
import globalStyles from "../../assets/styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/loginAuthContext";
type OptionItem = {
  label: string;
  darkIcon: React.ReactNode;
  lightIcon: React.ReactNode;
  onPress: () => void;
};

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);
  const { user, isLoggedIn, login, logout, isLoading } =
    useContext(AuthContext);
  const userName = AsyncStorage.getItem("userName") || "--";
  const userEmail = AsyncStorage.getItem("userEmail") || "--";
  const handleLogout = () => {
    console.log("Logged out");
    logout();
    navigation.navigate("Welcome");
  };
  const accountOptions: OptionItem[] = [
    {
      label: "Edit Profile",
      darkIcon: <DarkProfileIcon />,
      lightIcon: <EditProfileIcon />,
      onPress: () => {},
    },
    {
      label: "My Interests",
      darkIcon: <DarkMyintresetIcon />,
      lightIcon: <MyIntrestIcon />,
      onPress: () => navigation.navigate("ChooseYourInterests", {}),
    },
    {
      label: "Saved Articles",
      darkIcon: <DarkSavedIcon />,
      lightIcon: <SavedIcon />,
      onPress: () => navigation.navigate("SavedArticles"),
    },
  ];

  const moreOptions: OptionItem[] = [
    {
      label: "Help",
      darkIcon: <DarkHelp />,
      lightIcon: <HelpIcon />,
      onPress: () => {},
    },
    {
      label: "Setting",
      darkIcon: <DarkSetting />,
      lightIcon: <SettingIcon />,
      onPress: () => {},
    },
  ];

  const renderOption = ({
    label,
    darkIcon,
    lightIcon,
    onPress,
  }: OptionItem) => (
    <TouchableOpacity key={label} onPress={onPress} style={styles.optionRow}>
      <View style={styles.iconOptionContainer}>
        {theme === "dark" ? darkIcon : lightIcon}
        <Text
          style={[
            styles.labelText,
            {
              color:
                theme === "dark"
                  ? colors.nonaryBorder
                  : colors.tertiaryButtonColor,
            },
          ]}
        >
          {label}
        </Text>
      </View>
      <ForwardIcon />
    </TouchableOpacity>
  );
  const renderSection = (title: string, options: OptionItem[]) => (
    <View style={styles.section}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color:
              theme === "light"
                ? colors.octodenaryText
                : colors.darkPrimaryText,
          },
        ]}
      >
        {title}
      </Text>
      <View>{options.map(renderOption)}</View>
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.pageContainerWithBackground(theme)]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          {theme === "dark" ? <BackArrowWhite /> : <BackArrow />}
        </TouchableOpacity>

        <View
          style={[
            styles.profileContainer,
            {
              backgroundColor:
                theme === "dark"
                  ? colors.darkQuinaryBackground
                  : colors.primaryBackground,
            },
          ]}
        >
          <Image
            source={require("../../assets/Images/Prateek.jpg")}
            style={styles.profileImage}
          />
          <Text
            style={[
              styles.userName,
              {
                color:
                  theme === "dark"
                    ? colors.darkPrimaryText
                    : colors.octodenaryText,
              },
            ]}
          >
            {userName || "--"}
          </Text>
          <Text
            style={[
              styles.userEmail,
              {
                color:
                  theme === "light"
                    ? colors.novemdenaryText
                    : colors.darkSenaryText,
              },
            ]}
          >
            {userEmail || "--"}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.premiumButton,
            {
              backgroundColor:
                theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
            },
          ]}
        >
          <Text style={styles.premiumText}>Premium Membership</Text>
          <Text
            style={[
              styles.premiumSubText,
              {
                color:
                  theme === "light"
                    ? colors.septendenaryBackground
                    : colors.white,
              },
            ]}
          >
            Upgrade for more features
          </Text>
        </TouchableOpacity>
        <View style={styles.optionContainer}>
          {renderSection("Account", accountOptions)}
          {renderSection("More", moreOptions)}
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text
            style={[
              styles.logoutText,
              {
                color:
                  theme === "light"
                    ? colors.darkSenaryText
                    : colors.darkPrimaryText,
              },
            ]}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  backButton: {
    marginTop: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 45,
    marginBottom: 5,
  },
  userName: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: fontFamily.Cabinet700,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
  },
  premiumButton: {
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  premiumText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: fontFamily.Inter700,
  },
  premiumSubText: {
    fontSize: 14,
    marginTop: 2,
    fontFamily: fontFamily.Inter400,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  optionContainer: {
    gap: 16,
  },
  iconOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {},
  labelText: {
    fontSize: 16,
    fontFamily: fontFamily.Inter400,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.Inter700,
  },
  logoutButton: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  logoutText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 16,
  },
});
