import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from "../types/navigation";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/auth/login/login";
import SignUpScreen from "../screens/auth/signUp/signUp";
import HomeScreen from "../screens/homePage/homePage";
import SplashScreen from "../screens/splashScreen/splashScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        //screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
