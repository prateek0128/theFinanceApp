import { NavigatorScreenParams } from "@react-navigation/native";

// types/navigation.ts
export type RootStackParamList = {
  Splash: undefined;
  Start: undefined;
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  TellUsSomething?: { name?: string | null; email?: string };
  ChooseYourInterests?: { expertiseLevel?: string | null };
  BottomTabNavigator: NavigatorScreenParams<BottomTabParamList>;
  Home: undefined;
  HeadlineDetailsScreen?: {
    newsId?: string;
    imageKey?: string;
  };
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};
export type BottomTabParamList = {
  Home?: undefined;
  Interests?: undefined;
  Saved?: undefined;
  Profile?: NavigatorScreenParams<ProfileStackParamList>;
};
export type HomeStackParamList = {
  Home: undefined;
  HeadlineDetailsScreen: undefined;
};

export type ProfileStackParamList = {
  SavedArticles?: undefined;
  ProfileStack?: undefined;
  EditProfileScreen?: undefined;
};
