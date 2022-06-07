import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
//interfaces and types
interface ImageIndexProps {
  active: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 6px;
  height: 6px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.dark_2 : theme.colors.text};

  margin-left: 8px;
  border-radius: 3px;
`;

export const ProductImageWrapper = styled.View`
  width: ${Dimensions.get("window").width}px;

  justify-content: center;
  align-items: center;

  padding-top: 16px;
`;

export const ProductImage = styled.Image`
 width:  ${ Dimensions.get('window').width >= 800 ? RFValue(500) : RFValue(280)}px;
 height:  ${ Dimensions.get('window').height >= 800 ? RFValue(200) : RFValue(132)}px;

`;
