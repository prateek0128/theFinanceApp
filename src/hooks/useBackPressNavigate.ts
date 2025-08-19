import {
  useFocusEffect,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useCallback } from "react";

export function useBackPressNavigate<T extends object>(
  targetRoute: keyof T,
  params?: T[keyof T]
) {
  const navigation = useNavigation<NavigationProp<T>>();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (params !== undefined) {
          //@ts-ignore
          navigation.navigate(targetRoute, params);
        } else {
          navigation.navigate(targetRoute as never); // safe cast only for no-params
        }
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [navigation, targetRoute, params])
  );
}
