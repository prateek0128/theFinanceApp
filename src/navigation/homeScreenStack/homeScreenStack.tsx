import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/homePage/homeScreen/homeScreen";
import HeadlineDetailsScreen from "../../screens/homePage/headlineDetailsScreen/headlineDetailsScreen";
import { HomeStackParamList, RootStackParamList } from "../../types/navigation";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="HeadlineDetailsScreen"
        component={HeadlineDetailsScreen}
      />
    </Stack.Navigator>
  );
}
