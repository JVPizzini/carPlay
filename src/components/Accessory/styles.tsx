import styled from "styled-components/native";
import {Dimensions} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";



export const Container = styled.View`
  width: ${ Dimensions.get('window').width >= 800 ? RFValue(62) : RFValue(100)}px;
  height: ${RFValue(70)}px;

  justify-content: center;
  align-items: center;

  
  background-color: ${({ theme }) => theme.colors.background};
  
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 5px;
  /* flex-direction: row; */
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};

  font-size: ${ Dimensions.get('window').width >= 800 ? RFValue(8) : RFValue(13)}px;
  margin-top: 12px;
`;
