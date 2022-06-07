import React from "react";
import { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { Container } from "./styles";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

//interface ans types
interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={RFValue(24)}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}
