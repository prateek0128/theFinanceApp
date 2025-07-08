import React, { useState, useEffect, useContext } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors } from "../../assets/styles/colors";
import globalStyles from "../../assets/styles/globalStyles";
import fontFamily from "../../assets/styles/fontFamily";
import { ThemeContext } from "../../context/themeContext";
import {
  NextCardArrowWhite,
  NextCardArrowBlack,
  StartScreen1,
  StartScreen2,
  StartScreen3,
} from "../../assets/icons/components/startScreen";
const { width, height } = Dimensions.get("window");
const StartScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const translateAnim = useState(new Animated.ValueXY({ x: 100, y: 100 }))[0]; // start off-screen bottom right
  const opacityAnim = useState(new Animated.Value(0))[0];
  const [cardIndex, setCardIndex] = useState(0);
  const cardData = [
    {
      title: "Your Everyday Financial News App",
      text: "Now your finances are in one place and always under control",
      image: StartScreen1,
      backgroundColor: colors.blueCard,
    },
    {
      title: "Read News on the GO !",
      text: "All expenses by cards are reflected automatically in the application, and the analytics system helps to control them",
      image: StartScreen2,
      backgroundColor: colors.greenCard,
    },
    {
      title: "Learn what & could happen to the Market",
      text: "The system notices where you're slipping on the budget and tells you how to optimize costs",
      image: StartScreen3,
      backgroundColor: colors.yellowCard,
    },
  ];

  const currentCard = cardData[cardIndex];

  useEffect(() => {
    // Initial entry animation (optional)
    translateAnim.setValue({ x: 100, y: 100 });
    opacityAnim.setValue(0);

    Animated.parallel([
      Animated.timing(translateAnim, {
        toValue: { x: 0, y: 0 },
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  const handleNext = () => {
    if (cardIndex === cardData.length - 1) {
      navigation.navigate("Welcome");
      //navigation.navigate("ChooseYourInterests");
      setCardIndex(0);
    } else {
      const nextIndex = cardIndex + 1;
      setCardIndex(nextIndex);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark"
              ? colors.darkPrimaryBackground
              : colors.nonaryBackground,
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.cardTitle,
            {
              color:
                theme === "dark" ? colors.white : colors.undenaryBackground,
            },
          ]}
        >
          {currentCard.title}
        </Text>
        <Text
          style={[
            styles.cardText,
            {
              color: theme === "dark" ? colors.undenaryText : colors.denaryText,
            },
          ]}
        >
          {currentCard.text}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <currentCard.image />
      </View>
      <TouchableOpacity
        style={[
          styles.floatingButtonContainer,
          {
            borderColor:
              theme === "dark"
                ? colors.nonaryBackground
                : colors.darkPrimaryBackground,
            backgroundColor:
              theme === "dark"
                ? colors.duodenaryBackground
                : colors.undenaryBackground,
          },
        ]}
        onPress={handleNext}
      >
        {theme === "dark" ? <NextCardArrowBlack /> : <NextCardArrowWhite />}
      </TouchableOpacity>
    </View>
  );
};
export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // backgroundColor: colors.primaryBackground,
    padding: 20,
    // paddingLeft: 52,
    gap: 20,
  },
  card: {
    height: height * 0.8,
    backgroundColor: colors.blueCard,
    borderRadius: 32,
    justifyContent: "space-between",
  },
  textContainer: {
    gap: 12,
    marginLeft: 32,
    marginRight: 32,
  },
  cardTitle: {
    fontFamily: fontFamily.Cabinet700,
    fontSize: 40,
    //color: colors.secondaryText,
  },
  cardText: {
    fontFamily: fontFamily.Satoshi400,
    fontSize: 16,
    color: colors.tertiaryText,
  },
  imageContainer: {
    // flex: 1,
    //flexDirection: "row",
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    // alignSelf: "flex-end",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 52,
    height: 52,
    borderRadius: 28,
    borderWidth: 1,
  },
  floatingButton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
