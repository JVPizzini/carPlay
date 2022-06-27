import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export type ButtonProps = {
  color: string;
  children: React.ReactNode;
};

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.background};
  opacity: ${({ enabled }) => (enabled ? 1 : 0.5)};
  margin-bottom: 8px;
  flex-direction: row;
`;

export const Title = styled.Text<ButtonTextProps>`
  ${({ theme, light }) => css`
    font-family: ${theme.fonts.bold};
    color: ${light ? theme.colors.bookplay_New : theme.colors.shape};
    font-size: ${RFValue(13)}px;
  `}

  margin-right: 10px;
`;
