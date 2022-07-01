import React from "react";
import { Text, TextProps } from "react-native";

import { Container } from "./styles";

interface Props extends TextProps {
  color?: string;
  msg: string;
}

export function Error({ msg, color, ...rest }: Props) {
  return (
    <Container color={color} {...rest}>
      {msg}
    </Container>
  );
}
