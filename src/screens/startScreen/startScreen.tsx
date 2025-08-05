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
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors } from "../../assets/styles/colors";
import globalStyles from "../../assets/styles/globalStyles";
import fontFamily from "../../assets/styles/fontFamily";
import { ThemeContext } from "../../context/themeContext";
import {
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
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
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
        scrollViewRef.current?.scrollTo({
          x: windowWidth * nextIndex,
          animated: true,
        });
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [windowWidth]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(Dimensions.get("window").width);
    };

    const subscription = Dimensions.addEventListener("change", handleResize);

    return () => {
      subscription.remove(); // ✅ Proper cleanup
    };
  }, []);
  return (
    <View
      style={[
        globalStyles.pageContainerWithBackground(theme),
        styles.mainContainer,
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

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / windowWidth);
          setActiveIndex(newIndex);
          activeIndexRef.current = newIndex;
        }}
        scrollEventThrottle={16}
        style={{
          width: windowWidth,
        }}
        contentContainerStyle={{
          width: windowWidth * cardData.length,
          flexDirection: "row",
        }}
      >
        {cardData.map((item, index) => (
          <View
            key={index}
            style={[styles.carouselSlide, { width: windowWidth }]}
          >
            <View style={styles.imageContainer}>
              <item.image />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme === "dark" ? colors.white : colors.octodenaryText,
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
                  },
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

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
      {activeIndex === cardData.length - 1 ? (
        <Button
          title="Continue"
          onPress={() => {
            navigation.navigate("Welcome");
            //navigation.navigate("BottomTabNavigator");
          }}
        />
      ) : (
        <View style={{ height: 72 }} />
      )}
    </View>
  );
};
export default StartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    overflow: "hidden", // important for web
    width: "100%",
  },
  headingText: {
    fontSize: 32,
    fontFamily: fontFamily.Cabinet700,
    marginBottom: 6,
    textAlign: "center",
    marginTop: 20,
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
    width: width,
    paddingHorizontal: 0, // no padding
    marginHorizontal: 0,
    alignItems: "center",
    //gap: 20,
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
