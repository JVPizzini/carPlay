import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Load } from "../Load";

import { Container, Title } from "./styles";

type Props = RectButtonProps & {
  title: string;
  color?: string;
  light?: boolean;
  isLoading?: boolean;
  colorLoading?: string;
  sizeLoading?: number | "large" | "small";
  /*   onPress: () => {}; */
};

export function Button({
  title,
  color,
  light,
  isLoading = false,
  colorLoading,
  sizeLoading,
  ...rest
}: Props) {
  return (
    <Container color={color} {...rest}>
      <Title light={light}>{title} </Title>
      {isLoading && <Load color={colorLoading} size={sizeLoading} flex={0}/>}
    </Container>
  );
}
