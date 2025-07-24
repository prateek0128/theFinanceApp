import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/homePage/homeScreen/homeScreen";
import HeadlineDetailsScreen from "../../screens/homePage/headlineDetailsScreen/headlineDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen
        name="HeadlineDetailsScreen"
        component={HeadlineDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
