import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  /* flex: 1; */
  justify-content: center;
  align-items: center;
  width: ${RFValue(250)}px;
  height: ${RFValue(250)}px;
  /* background-color: red; */
  margin-top: -100px;
  /* position: absolute; */
`;
