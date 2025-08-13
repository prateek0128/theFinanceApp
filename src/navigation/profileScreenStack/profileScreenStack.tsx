import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/homePage/homeScreen/homeScreen";
import HeadlineDetailsScreen from "../../screens/homePage/headlineDetailsScreen/headlineDetailsScreen";
import { HomeStackParamList, RootStackParamList } from "../../types/navigation";
import ProfileScreen from "../../screens/profilePage/profileScreen/profileScreen";
import SavedArticles from "../../screens/profilePage/savedArticle/savedArticle";
import { ProfileStackParamList } from "../../types/navigation";
import EditProfileScreen from "../../screens/profilePage/editProfileScreen/editProfileScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileStack" component={ProfileScreen} />
      <Stack.Screen name="SavedArticles" component={SavedArticles} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
