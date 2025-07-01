import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { colors } from "../../../assets/styles/colors";

import {
  GraphImage,
  IncrementArrow,
  ProfileIcon,
  CurrencyImage,
} from "../../../assets/icons/components/homepage";
import HeadlineDetailCard from "../../../components/headlineDetailedCard/headlineDetailedCard";
import { RootStackParamList } from "../../../types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import fontFamily from "../../../assets/styles/fontFamily";
import {
  CurrencyImage2,
  GraphImage2,
} from "../../../assets/icons/components/headlineDetailsView";
import Swiper from "react-native-deck-swiper";
import axios from "axios";
import { getNewsFeed } from "../../../apiServices/news";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const swiperRef = useRef<Swiper<any>>(null);
  const articles = [
    {
      title: "RBI holds rates steady, signals caution on inflation",
      author: "Akhil Salunkhe",
      time: "2h ago",
    },
    {
      title: "Tech Stocks surge on positive earnings outlook",
      author: "Shreya Heda",
      time: "4h ago",
    },
  ];
  useEffect(() => {
    getAllNewsAPI();
  }, []);
  // HeadlinesScreen.tsx  (or whatever file you’re in)
  const cards = [
    {
      imageKey: "graph",
      author: "Akhil Salunkhe",
      time: "1 Day ago",
      impactScore: 90,
      title: "RBI’s rate pause: Impact on Lending Rates",
      subHeading:
        "Experts analyze the potential impact of the RBI's decision on lending rates, assessing implications for borrowers and the overall economy.",
      HeadlineImageComponent: GraphImage2,
      ProfileIconComponent: ProfileIcon,
      ImpactIconComponent: IncrementArrow,
      points: [
        "The Reserve Bank of India (RBI) concluded its monetary policy review today, maintaining the repo rate at 6.5%.",
        "This decision aligns with market expectations, reflecting a cautious approach amid global economic uncertainties.",
        "The RBI's statement highlighted concerns about inflation, projecting it to remain above the target range in the near term.",
      ],
      discussions: [
        {
          id: "1",
          name: "Anika Sharma",
          time: "1h",
          text: "I think the RBI's decision is prudent...",
          likes: 12,
          unlikes: 2,
          profileType: "female",
        },
        {
          id: "2",
          name: "Rohan Verma",
          time: "2h",
          text: "The market seems to have priced in this decision...",
          likes: 12,
          unlikes: 2,
          profileType: "male",
        },
      ],
    },
    {
      imageKey: "currency",
      author: "Neha Kapoor",
      time: "3 Days ago",
      impactScore: 85,
      title: "India’s GDP Growth Surges: What It Means for Investors",
      subHeading:
        "India's GDP growth beats expectations, driven by strong domestic consumption and manufacturing output.",
      HeadlineImageComponent: CurrencyImage2,
      ProfileIconComponent: ProfileIcon,
      ImpactIconComponent: IncrementArrow,
      points: [
        "India's GDP growth beats expectations, driven by strong domestic consumption and manufacturing output.",
        "Experts weigh in on how this growth trend might affect stock markets, foreign investments, and inflation targets.",
      ],
      discussions: [
        {
          id: "1",
          name: "Siddharth Rao",
          time: "45m",
          text: "This is a very positive sign for long-term investors. The fundamentals look strong.",
          likes: 18,
          unlikes: 1,
          profileType: "male",
        },
        {
          id: "2",
          name: "Meera Joshi",
          time: "2h",
          text: "While the numbers are impressive, we need to be cautious about rising inflation and global volatility.",
          likes: 10,
          unlikes: 3,
          profileType: "female",
        },
      ],
    },
    {
      imageKey: "currency",
      author: "Priya Desai",
      time: "2 Days ago",
      impactScore: 78,
      title: "SEBI Introduces New IPO Guidelines for Startups",
      subHeading:
        "The Securities and Exchange Board of India has released new norms to simplify the IPO process for tech startups, aiming to boost innovation and investor trust.",
      HeadlineImageComponent: CurrencyImage2,
      ProfileIconComponent: ProfileIcon,
      ImpactIconComponent: IncrementArrow,
      points: [
        "The SEBI's updated IPO policy will allow tech startups to go public with fewer compliance hurdles.",
        "Startups will benefit from relaxed disclosure norms and reduced lock-in periods for early investors.",
        "This move is expected to attract more domestic and international interest in India's startup ecosystem.",
      ],
      discussions: [
        {
          id: "1",
          name: "Arjun Mehta",
          time: "1h",
          text: "This is a fantastic step for the startup ecosystem. It opens doors for many companies that previously found the IPO route complex.",
          likes: 22,
          unlikes: 1,
          profileType: "male",
        },
        {
          id: "2",
          name: "Kavita Reddy",
          time: "3h",
          text: "I hope this doesn't compromise investor protection. SEBI needs to strike the right balance.",
          likes: 15,
          unlikes: 2,
          profileType: "female",
        },
      ],
    },
  ];

  const getAllNewsAPI = async () => {
    try {
      const response = await getNewsFeed();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Top Headlines</Text>
      </View>
      <View style={styles.articleRow}>
        {articles.map((item, index) => (
          <View key={index} style={styles.articleCard}>
            <View style={styles.articleDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                by {item.author} · {item.time}
              </Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Read Full Article</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.swiperWrapper}>
        {cards.map((card, index) => {
          return (
            <>
              <HeadlineDetailCard
                index={index}
                authorName={card.author}
                timeAgo={card.time}
                impactScore={card.impactScore}
                heading={card.title}
                subHeading={card.subHeading}
                HeadlineImageComponent={card.HeadlineImageComponent}
                ProfileIconComponent={card.ProfileIconComponent}
                ImpactIconComponent={card.ImpactIconComponent}
                onPress={() =>
                  navigation.navigate("HeadlineDetailsScreen", {
                    imageKey: card.imageKey,
                    title: card.title,
                    author: card.author,
                    time: card.time,
                    impactScore: card.impactScore,
                    points: card.points,
                    //@ts-ignore
                    discussions: card.discussions,
                  })
                }
              />
            </>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    //flexGrow: 1,
    backgroundColor: colors.primaryBackground,
  },
  headingContainer: {
    marginTop: 30,
  },
  heading: {
    fontSize: 32,
    fontFamily: fontFamily.titleFont,
    textAlign: "left",
    color: colors.quaternaryText,
  },
  articleRow: {
    marginTop: 32,
    flexDirection: "row",
    gap: 12,
  },
  articleCard: {
    width: width * 0.433,
    //height: 165,
    // marginTop: 62,
    borderRadius: 24,
    borderWidth: 1,
    padding: 12,
    gap: 16,
    backgroundColor: colors.white,
    borderColor: colors.tertiaryBorderColor,
  },
  articleDetails: {
    gap: 8,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.textFont700,
    color: colors.primaryText,
  },
  meta: {
    fontSize: 10,
    fontFamily: fontFamily.textFont500,
    color: colors.tertiaryText,
  },
  button: {
    backgroundColor: colors.quinaryBackground,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  buttonText: {
    color: colors.quinaryText,
    fontFamily: fontFamily.textFont700,
    fontSize: 14,
  },
  swiperWrapper: {
    ///height: CARD_HEIGHT,
    marginTop: 8,
  },
});
