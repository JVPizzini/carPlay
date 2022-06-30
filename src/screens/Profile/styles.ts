import { ReactNode } from "react";
import styled, { css } from "styled-components/native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import {
  BorderlessButtonProps,
  RectButtonProps,
} from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

//interfaces and types
interface ButtonLogoutProps extends BorderlessButtonProps {
  children?: ReactNode;
}
interface PhotoButtonProps extends RectButtonProps {
  children?: ReactNode;
}
interface ButtonChangeOptionsProps extends RectButtonProps {
  children?: ReactNode;
  active: boolean;
}
interface OptionProps {
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: 227px;
  ${({ theme }) => css`
    background-color: ${theme.colors.bookplay_New};
  `}

  padding: 0 24px;
  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 32}px;
`;
export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.bold};
  `}
`;
export const LogoutButton = styled(BorderlessButton)<ButtonLogoutProps>``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;

  background-color: ${({ theme }) => theme.colors.background};

  margin-top: 48px;
`;
export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)<PhotoButtonProps>`
  background-color: ${({ theme }) => theme.colors.bookplay_Old};
  width: 40px;
  height: 40px;
  border-radius: 25px;

  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.background};

  flex-direction: row;
  justify-content: space-around;

  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  align-items: center;
  justify-content: center;

  ${({ active, theme }) =>
    active &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.blue_medium100};
    `}
  padding-bottom: 14px;
`;

export const OptionTitle = styled.Text<OptionProps>`
  ${({ theme, active }) => css`
    font-family: ${active ? theme.fonts.bold : theme.fonts.regular};
    color: ${active ? theme.colors.dark_2 : theme.colors.text};
    font-size: ${active ? RFValue(20) : RFValue(18)}px;
  `};
`;

export const Section = styled.View`
  height: 150px;

  justify-content: space-between;

  padding: 0 24px;

  margin-bottom: 24px;
`;
