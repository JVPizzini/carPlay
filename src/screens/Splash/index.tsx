import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

//assets
import PlaySvg from "../../assets/playWhite.svg";
import AudiobookSvg from "../../assets/audiobook2White.svg";
import KidsSvg from "../../assets/kids.svg";
import BookSvg from "../../assets/closedBookWhite.svg";

//styled-components
import { Container } from "./styles";

//interfaces and types

export function Splash() {
  const navigation = useNavigation<any>();
  const splashAnimation = useSharedValue(0);

  const playStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 10, 15, 20, 25],
        [0, 0.3, 1, 0.3, 0]
      ),
    };
  });
  const audiobookStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [30, 35, 40, 45, 50],
        [0, 0.3, 1, 0.3, 0]
      ),
    };
  });
  const kidsStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [55, 60, 65, 70, 75],
        [0, 0.3, 1, 0.3, 0]
      ),
    };
  });
  const bookStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [80, 85, 90, 95, 100],
        [0, 0.3, 1, 0.3, 0]
      ),
    };
  });

  function startApp() {
    navigation.navigate("Home");
  }

  useEffect(() => {
    splashAnimation.value = withTiming(100, { duration: 4000 }, () => {
      "worklet";
      runOnJS(startApp)();
    });
  }, []);

  return (
    <Container>
      <Animated.View style={[playStyle, { position: "absolute" }]}>
        <PlaySvg width={100} height={80} />
      </Animated.View>
      <Animated.View style={[audiobookStyle, { position: "absolute" }]}>
        <AudiobookSvg width={100} height={80} />
      </Animated.View>
      <Animated.View style={[kidsStyle, { position: "absolute" }]}>
        <KidsSvg width={100} height={80} />
      </Animated.View>
      <Animated.View style={[bookStyle, { position: "absolute" }]}>
        <BookSvg width={100} height={80} />
      </Animated.View>
    </Container>
  );
}
