import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bookplay_New};

  padding-top: 50px;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  position: absolute;
  margin-top: ${RFValue(280)}px;
  /* padding-top: ${RFValue(5)}px; */
  /* bottom: 50px; */
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};

  margin-top: ${RFValue(20)}px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: ${RFValue(25)}px;
  text-align: center;

  margin-top: ${RFValue(15)}px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  /* margin: 0 ${RFValue(25)}px 0; */
  bottom: ${RFValue(50)}px;
  /* background-color:red; */
`;
