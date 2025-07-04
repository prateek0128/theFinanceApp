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
const { width, height } = Dimensions.get("window");
const StartScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const imageName = "finance"; // could come from state or props
  //const imageSource = require(`../../assets/images/${imageName}.png`);
  //   const imageSource = require("../../assets/images/start/startBlue.svg");
  const imageBlueCard = require("../../assets/images/start/blueCard.png");
  const imageGreenCard = require("../../assets/images/start/greenCard.png");
  const imageYellowCard = require("../../assets/images/start/yellowCard.png");
  const nextImage = require("../../assets/images/start/nextCard.png");
  const translateAnim = useState(new Animated.ValueXY({ x: 100, y: 100 }))[0]; // start off-screen bottom right
  const opacityAnim = useState(new Animated.Value(0))[0];
  const [cardIndex, setCardIndex] = useState(0);
  const [cardLayout, setCardLayout] = useState({ width: 0, height: 0 });
  const cardData = [
    {
      title: "Your Everyday Financial News App",
      text: "Now your finances are in one place and always under control",
      image: imageBlueCard,
      backgroundColor: colors.blueCard,
    },
    {
      title: "Read News on the GO !",
      text: "All expenses by cards are reflected automatically in the application, and the analytics system helps to control them",
      image: imageGreenCard,
      backgroundColor: colors.greenCard,
    },
    {
      title: "Learn what & could happen to the Market",
      text: "The system notices where you're slipping on the budget and tells you how to optimize costs",
      image: imageYellowCard,
      backgroundColor: colors.yellowCard,
    },
  ];

  const currentCard = cardData[cardIndex];
  const [displayedImage, setDisplayedImage] = useState(cardData[0].image);

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
    let nextIndex = 0;
    if (cardIndex === cardData.length - 1) {
      //navigation.navigate("Login");
      navigation.navigate("Welcome");
    } else {
      nextIndex = (cardIndex + 1) % cardData.length;
      const nextImage = cardData[nextIndex].image;
    }

    // Animate exit
    Animated.parallel([
      Animated.timing(translateAnim, {
        toValue: { x: 100, y: 100 },
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Swap image and card
      setCardIndex(nextIndex);
      setDisplayedImage(nextImage);

      // Reset position off-screen and opacity
      translateAnim.setValue({ x: 100, y: 100 });
      opacityAnim.setValue(0);

      // Animate entry
      Animated.parallel([
        Animated.timing(translateAnim, {
          toValue: { x: 0, y: 0 },
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark" ? "#010104" : colors.nonaryBackground,
        },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentCard.backgroundColor,
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{currentCard.title}</Text>
          <Text style={styles.cardText}>{currentCard.text}</Text>
        </View>
        <View style={styles.imageContainer}>
          {/* <Image
            source={imageBlueCard} // update with your image path
            //style={styles.cardImage}
            resizeMode="contain"
          /> */}
          <Animated.Image
            source={currentCard.image}
            resizeMode="contain"
            style={[
              {
                transform: translateAnim.getTranslateTransform(),
                opacity: opacityAnim,
              },
            ]}
          />
        </View>
      </View>
      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButtonContainer}
        onPress={handleNext}
      >
        <Image source={nextImage} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
export default StartScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // backgroundColor: colors.primaryBackground,
    padding: 20,
    gap: 20,
  },
  card: {
    height: height * 0.8,
    backgroundColor: colors.blueCard,
    borderRadius: 32,
    justifyContent: "space-between",
  },
  textContainer: {
    gap: 20,
    margin: 20,
  },
  cardTitle: {
    fontFamily: fontFamily.titleFont,
    fontSize: 40,
    color: colors.secondaryText,
  },
  cardText: {
    fontFamily: fontFamily.textFont400,
    fontSize: 16,
    color: colors.tertiaryText,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  floatingButtonContainer: {
    // position: "absolute",
    // bottom: 20,
    // right: 20,
    alignSelf: "flex-end",
    // backgroundColor: colors.accent || "#007BFF", // fallback color
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
