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
    title?: string;
    author?: string;
    time?: string;
    impactLabel?: string;
    impactScore?: number;
    points?: string[];
    discussions?: {
      id?: string;
      name?: string;
      time?: string;
      text?: string;
      likes?: number;
      unlikes?: number;
      profileType?: "male" | "female";
    }[];
  };
};
export type BottomTabParamList = {
  Home: undefined;
  Portfolio: undefined;
  News: undefined;
  Profile: undefined;
};
export type HomeStackParamList = {
  HomeScreen: undefined;
  HeadlineDetailsScreen: undefined;
};
