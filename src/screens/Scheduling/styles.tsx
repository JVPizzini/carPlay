import { Dimensions } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

//Interfaces and types
interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(300)}px;
  background-color: ${({ theme }) => theme.colors.bookplay_New};
  justify-content: center;
  padding: ${getStatusBarHeight() + 30}px 25px 25px;
  /* padding-top: ; */
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(34)}px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  color: ${({ theme }) => theme.colors.blue_medium100};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;

  margin-bottom: 5px;
`;

export const DateValue = styled.Text<DateValueProps>`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;

  ${({ theme, selected }) =>
    !selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.blue_medium100};
      padding-bottom: 5px;
    `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px
    ${Dimensions.get("window").width >= 800 ? RFValue(80) : RFValue(24)}px
    ${getBottomSpace() + 24}px;

  background-color: #fff;
`;
