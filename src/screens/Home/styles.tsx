import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";
// import { CarDTO } from "../../dtos/CarDTO";
import { Car as CarModel } from "../../database/model/Car";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

interface MyCarsButtonProps {
  children: React.ReactNode;
}

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Headers = styled.View`
  width: 100%;
  height: 113px;
  background-color: ${({ theme }) => theme.colors.bookplay_New};
  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ProductList = styled(
  FlatList as new (props: FlatListProps<CarModel>) => FlatList<CarModel>
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(ButtonAnimated)<MyCarsButtonProps>`
  width: 60px;
  height: 60px;

  border-radius: 30px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.bookplay_New};

  position: absolute;
  bottom: 22px;
  right: 22px;
`;
