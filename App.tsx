import React, { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";
import theme from "./src/global/theme";
import { ThemeProvider } from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "./src/hooks";

import {
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  useFonts,
} from "@expo-google-fonts/lato";

//Routes
import { Routes } from "./src/routes";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
