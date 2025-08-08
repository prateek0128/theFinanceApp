import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../screens/auth/login/login";
import SignUpScreen from "../../screens/auth/signUp/signUp";
import HomeScreen from "../../screens/homePage/homeScreen/homeScreen";
import SplashScreen from "../../screens/splashScreen/splashScreen";
import StartScreen from "../../screens/startScreen/startScreen";
import WelcomeScreen from "../../screens/auth/welcomeScreen/welcomeScreen";
import TellUsSomething from "../../screens/tellUsSomething/tellUsSomething";
import BottomTabNavigator from "../bottomNavigation/bottomNavigation";
import ChooseYourInterests from "../../screens/chooseYourInterests/chooseYourInterests";
import HeadlineDetailsScreen from "../../screens/homePage/headlineDetailsScreen/headlineDetailsScreen";
import SavedArticles from "../../screens/savedArticle/savedArticle";
import ProfileScreen from "../../screens/profileScreen/profileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TellUsSomething" component={TellUsSomething} />
        <Stack.Screen
          name="ChooseYourInterests"
          component={ChooseYourInterests}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name="HeadlineDetailsScreen"
          component={HeadlineDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
