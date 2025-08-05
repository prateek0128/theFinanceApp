// types/navigation.ts
export type RootStackParamList = {
  Splash: undefined;
  Start: undefined;
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  TellUsSomething: { name?: string | null; email?: string };
  ChooseYourInterests: { roleId?: string | null; goalId: string | null };
  BottomTabNavigator: undefined;
  Home: undefined;
  HeadlineDetailsScreen: {
    newsId?: string;
    imageKey?: string;
  };
  Profile:undefined;
  SavedArticles: undefined;
};
export type BottomTabParamList = {
  Home: undefined;
  Interests: undefined;
  News: undefined;
  Profile: undefined;
};
export type HomeStackParamList = {
  Home: undefined;
  HeadlineDetailsScreen: undefined;
};

export type ProfileStackParamList = {
  SavedArticles: undefined;
  Profile: undefined;
}
