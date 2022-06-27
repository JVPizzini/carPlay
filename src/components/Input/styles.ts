import React from "react";
import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import {
  BorderlessButton,
  BorderlessButtonProps,
} from "react-native-gesture-handler";

//interdaces and types
interface ButtonProps extends BorderlessButtonProps {
  children: React.ReactNode;
}

interface BorderGradientProps extends LinearGradientProps {
  isFocused: boolean;
}

export const Container = styled.View`
  width: 100%;
  height: 35px;
  flex-direction: row;
  margin-top: 5px;
`;

export const BorderGradient = styled<any>(
  LinearGradient
).attrs<BorderGradientProps>(({ theme, isFocused }) => ({
  colors: isFocused ? theme.colors.gradientColor : theme.colors.gradient100,
  start: { x: 0.09, y: 0.7 },
  end: { x: 1, y: 0.7 },
}))<BorderGradientProps>`
  width: 100%;

  padding: 0 1px;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

export const ButtonPasswordVisible = styled(BorderlessButton)<ButtonProps>``;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  padding-right: 5px;
  background-color: ${({ theme }) => theme.colors.shape};
  align-items: center;
  justify-content: center;
`;

export const InputText = styled(TextInput)`
  flex: 1;
  height: 33px;

  font-size: 18px;
  padding: 0 20px;
  margin-left: 10px;

  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text};
`;
