import React from "react";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

//interfaces and types
interface Props extends RectButtonProperties {
  title: string;
}

export function ConfirmButton({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
