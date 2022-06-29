import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import { Home } from "../screens/Home";
import { ProductDetails } from "../screens/ProductDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Completed } from "../screens/Completed";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      {/* <Screen name="Splash" component={Splash} /> */}
      <Screen name="Home" component={Home} />
      <Screen name="ProductDetails" component={ProductDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Complete" component={Completed} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
