import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  height: 100%;
`;

export const Header = styled.View`
  width: 100%;
  /* height: ${RFValue(100)}px; */
  /* margin-top: ${getStatusBarHeight() + 30}px; */
  padding: 35px 24px 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.bookplay_New};
`;

export const Title = styled.Text`
  margin-top: 60px;
  margin-bottom: 16px;
  ${({ theme }) => css`
    font-size: ${RFValue(40)}px;
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.bookplay_New};
  `}
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(15)}px;
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
    line-height: ${RFValue(25)}px;
  `}
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleForm = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.title};
    margin-bottom: 24px;
  `}
`;

export const Content = styled.View`
  padding: 0 24px;
  /* background-color: red; */
`;

export const Form = styled.View`
  width: 100%;
  height: 150px;
  margin-top: 34px;
  margin-bottom: 30px;
  justify-content: space-between;
  /* background-color: green; */
`;

export const Footer = styled.View`
  padding: 15px 24px;
`;
