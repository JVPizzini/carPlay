import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props {
  color?: string;
}

export const Container = styled.Text<Props>`
  color: ${({ theme, color }) => (color ? color : theme.colors.error)};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  padding: 5px 50px;
  overflow: scroll;
`;
