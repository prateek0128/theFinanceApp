import React, { use, useContext, useEffect, useState } from "react";
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
} from "../../../assets/icons/components/Profile";

import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import fontFamily from "../../../assets/styles/fontFamily";
import { ThemeContext } from "../../../context/themeContext";
import { colors } from "../../../assets/styles/colors";
import globalStyles from "../../../assets/styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../context/loginAuthContext";
import Header from "../../../components/header/header";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";
type OptionItem = {
  label: string;
  darkIcon: React.ReactNode;
  lightIcon: React.ReactNode;
  onPress: () => void;
};

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("--");
  const [userEmail, setUserEmail] = useState("--");
  const handleLogout = () => {
    console.log("Logged out");
    logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      })
    );
  };
  const accountOptions: OptionItem[] = [
    {
      label: "Edit Profile",
      darkIcon: <DarkProfileIcon />,
      lightIcon: <EditProfileIcon />,
      onPress: () =>
        navigation.navigate("Profile", { screen: "EditProfileScreen" }),
    },
    // {
    //   label: "My Interests",
    //   darkIcon: <DarkMyintresetIcon />,
    //   lightIcon: <MyIntrestIcon />,
    //   onPress: () => navigation.navigate("ChooseYourInterests", {}),
    // },
    // {
    //   label: "Saved Articles",
    //   darkIcon: <DarkSavedIcon />,
    //   lightIcon: <SavedIcon />,
    //   onPress: () =>
    //     navigation.navigate("Profile", { screen: "SavedArticles" }),
    // },
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
  }: OptionItem) => {
    return (
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
  };
  const renderSection = (title: string, options: OptionItem[]) => {
    return (
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
  };
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        const email = await AsyncStorage.getItem("userEmail");
        setUserName(name || "--");
        setUserEmail(email || "--");
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    loadProfileData();
  }, []);
  useBackPressNavigate("Home");
  return (
    <SafeAreaView style={[globalStyles.pageContainerWithBackground(theme)]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
      >
        <View>
          <View style={styles.headerContainer}>
            <Header
              onBackClick={() => {
                navigation.navigate("BottomTabNavigator");
              }}
              showThemeIcon={false}
            />
          </View>
          <View
            style={[
              styles.profileContainer,
              // {
              //   backgroundColor:
              //     theme === "dark"
              //       ? colors.darkQuinaryBackground
              //       : colors.primaryBackground,
              // },
            ]}
          >
            {/* <Image
              source={require("../../../assets/Images/Prateek.jpg")}
              style={styles.profileImage}
            /> */}
            <View style={[styles.userDetailsContainer]}>
              <Text
                style={[
                  styles.userNameStyle,
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
                  styles.userEmailStyle,
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
            <Text style={[styles.premiumText]}>Premium Membership</Text>
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
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
    gap: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
  userDetailsContainer: { gap: 10, alignItems: "center" },
  userNameStyle: {
    fontSize: 18,
    fontFamily: fontFamily.Cabinet700,
  },
  userEmailStyle: {
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
  },
  premiumButton: {
    borderRadius: 12,
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  premiumText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fontFamily.Inter700,
  },
  premiumSubText: {
    fontSize: 14,
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
    position: "absolute",
    bottom: 0,
  },
  logoutText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 16,
  },
});
