import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/homePage/homeScreen/homeScreen";
import HeadlineDetailsScreen from "../../screens/homePage/headlineDetailsScreen/headlineDetailsScreen";
import { HomeStackParamList, RootStackParamList } from "../../types/navigation";
import ProfileScreen from "../../screens/profileScreen/profileScreen";
import SavedArticles from "../../screens/SavedArticle/savedArticle";
import { ProfileStackParamList } from "../../types/navigation";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SavedArticles" component={SavedArticles} />
    </Stack.Navigator>
  );
}
