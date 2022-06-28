export type CreateAccountNavigationProps = {
  user: { email: string; password: string; name: string; driver_license?: string };
};

export type CompletedNavigationProps = {
  Props?: { title: string; msg: string; screenName: string };
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      SignUpFirstStep: undefined;
      SignUpSecondStep: CreateAccountNavigationProps;
      Home: undefined;
      ProductDetails: undefined;
      Scheduling: undefined;
      SchedulingDetails: undefined;
      Complete: CompletedNavigationProps;
      MyCars: undefined;
    }
  }
}
