import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { colors } from "../../assets/styles/colors";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const NewsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>News Screen</Text>
      </View>
    </ScrollView>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: colors.primaryBackground,
  },
  headingContainer: {
    marginTop: 58,
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "left",
    color: colors.quaternaryText,
  },
});
