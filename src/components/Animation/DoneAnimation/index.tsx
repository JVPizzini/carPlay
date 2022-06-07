import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import doneAnimation from "../../../assets/done_Animated.json";

//styles-Components
import { Container } from "./styles";

//interfaces and types

export function DoneAnimation() {
  return (
    <Container>
      <LottieView
        source={doneAnimation}
        autoPlay
        loop={false}
        // style={{  backgroundColor: "red" }}
      />
    </Container>
  );
}
