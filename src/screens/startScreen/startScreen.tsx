import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  FlatList,
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
import Button from "../../components/button/button";
//import Carousel from "react-native-snap-carousel";
const { width, height } = Dimensions.get("window");
const StartScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const translateAnim = useState(new Animated.ValueXY({ x: 100, y: 100 }))[0]; // start off-screen bottom right
  const opacityAnim = useState(new Animated.Value(0))[0];
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const activeIndexRef = useRef(0);
  const cardData = [
    {
      title: "Your All-in-One Financial News Hub",
      text: "Track trends, read updates, and stay in control of your money - every single day.",
      image: StartScreen1,
    },
    {
      title: "Stay Informed, Anytime, Anywhere",
      text: "Stay updated with real-time financial stories on the go.",
      image: StartScreen2,
    },
    {
      title: "Understand the Market before it Moves",
      text: "Get expert-backed insights and analysis to make smarter financial decisions.",
      image: StartScreen3,
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndexRef.current < cardData.length - 1) {
        const nextIndex = activeIndexRef.current + 1;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        // ❌ Don't call setActiveIndex here!
        // It causes dot update before scroll is done
        activeIndexRef.current = nextIndex;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
      <Text style={styles.headingText}>
        <Text
          style={{
            color: theme == "dark" ? colors.white : colors.octodenaryText,
          }}
        >
          Market
        </Text>
        <Text style={{ color: colors.sexdenaryText }}>Brief's</Text>
      </Text>
      {/* <View style={styles.caraouselContainer}> */}
      <FlatList
        ref={flatListRef}
        data={cardData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // snapToInterval={width}
        // decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / width);
          setActiveIndex(newIndex);
          activeIndexRef.current = newIndex;
        }}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        renderItem={({ item }) => (
          <View style={styles.carouselSlide}>
            <View style={styles.imageContainer}>
              <item.image />
            </View>
            <View style={[styles.textContainer]}>
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme === "dark" ? colors.white : colors.octodenaryText,
                    textAlign: "center",
                  },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.cardText,
                  {
                    color:
                      theme === "dark" ? colors.white : colors.novemdenaryText,
                    textAlign: "center",
                  },
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={styles.paginationContainer}>
        {cardData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      {/* </View> */}
      {activeIndex === cardData.length - 1 ? (
        <Button
          title="Continue"
          onPress={() => {
            navigation.navigate("TellUsSomething", {});
          }}
          buttonStyle={{
            backgroundColor: colors.sexdenaryText,
            paddingVertical: 16,
            paddingHorizontal: 32,
          }}
          textStyle={{
            fontFamily: fontFamily.Inter500,
            fontSize: 16,
            color: colors.white,
          }}
        />
      ) : (
        <View style={{ height: 72 }} /> // Keeps layout height consistent
      )}
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
    paddingVertical: 20,
    //paddingLeft: 52,
    gap: 20,
  },
  headingText: {
    fontSize: 32,
    fontFamily: fontFamily.Cabinet700,
    marginBottom: 6,
    textAlign: "center",
    marginTop: 20,
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
  caraouselContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselSlide: {
    width: width, // Full screen width
    // justifyContent: "center",
    paddingHorizontal: 0, // no padding
    marginHorizontal: 0,
    alignItems: "center",
    gap: 20,
  },
  cardTitle: {
    fontFamily: fontFamily.Inter700,
    fontSize: 32,
    //color: colors.secondaryText,
  },
  cardText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 14,
  },
  imageContainer: {
    // marginBottom: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: colors.sexdenaryText, // or any color
  },
  inactiveDot: {
    backgroundColor: colors.septendenaryBackground, // lighter color
  },
});
