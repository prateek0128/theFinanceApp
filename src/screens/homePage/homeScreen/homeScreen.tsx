import React from "react";
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
import { getNewsFeed } from "../../../apiServices/news";
const { width, height } = Dimensions.get("window");
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
  const headlines = [
    {
      title: "RBI’s rate pause: Impact on Lending Rates",
      author: "Akhil Salunkhe",
      time: "1 Day ago",
      impactScore: 90,
      points: [
        "Experts analyze the potential impact of the RBI's decision on lending rates, assessing implications for borrowers and the overall economy.",
        "The Reserve Bank of India (RBI) has decided to hold interest rates steady, signaling a cautious approach towards inflation.",
      ],
      discussions: [
        {
          id: "1",
          name: "Anika Sharma",
          time: "1h",
          text: "I think the RBI's decision is prudent given the current global scenario. It's crucial to balance growth with inflation control.",
          likes: 12,
          unlikes: 2,
          profileType: "female",
        },
        {
          id: "2",
          name: "Rohan Verma",
          time: "2h",
          text: "The market seems to have priced in this decision. However, the RBI's outlook on inflation remains a key monitorable.",
          likes: 12,
          unlikes: 2,
          profileType: "male",
        },
      ],
    },
    {
      title: "India’s GDP Growth Surges: What It Means for Investors",
      author: "Neha Kapoor",
      time: "3 Days ago",
      impactScore: 85,
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
      <HeadlineDetailCard
        authorName="Akhil Salunkhe"
        timeAgo="1 Day ago"
        impactScore={90}
        heading="RBI’s rate pause: Impact on Lending Rates"
        subHeading="Experts analyze the potential impact of the RBI's decision on lending rates, assessing implications for borrowers and the overall economy."
        HeadlineImageComponent={GraphImage2}
        ProfileIconComponent={ProfileIcon}
        ImpactIconComponent={IncrementArrow}
        onPress={() => {
          // navigation.navigate("HeadlineDetailsScreen");
          navigation.navigate("HeadlineDetailsScreen", {
            imageKey: "graph", // or "currency"
            title: "RBI’s rate pause: Impact on Lending Rates",
            author: "Akhil Salunkhe",
            time: "1 Day ago",
            impactScore: 90,
            points: [
              "The Reserve Bank of India (RBI) concluded its monetary policy review today, maintaining the repo rate at 6.5%. ",
              "This decision aligns with market expectations, reflecting a cautious approach amid global economic uncertainties. ",
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
          });
        }}
      />
      <HeadlineDetailCard
        authorName="Akhil Salunkhe"
        timeAgo="1 Day ago"
        impactScore={90}
        heading="India’s GDP Growth Surges: What It Means for Investors"
        subHeading="Experts analyze the potential impact of the RBI's decision on lending rates, assessing implications for borrowers and the overall economy."
        HeadlineImageComponent={CurrencyImage2}
        ProfileIconComponent={ProfileIcon}
        ImpactIconComponent={IncrementArrow}
        onPress={() => {
          // navigation.navigate("HeadlineDetailsScreen");
          navigation.navigate("HeadlineDetailsScreen", {
            imageKey: "currency",
            title: "India’s GDP Growth Surges: What It Means for Investors",
            author: "Neha Kapoor",
            time: "3 Days ago",
            impactScore: 85,
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
          });
        }}
      />
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
});
