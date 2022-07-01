import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButtonProps } from "react-native-gesture-handler";
// import { CarModel } from "../../dtos/CarModel";
import {Car as CarModel} from '../../database/model/Car'
//Svgs
import Book from "../../assets/closedBook.svg";
import Audiobook from "../../assets/audiobook2.svg";

import {
  Container,
  ProductType,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  Details,
  ProductImage,
} from "./styles";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

export interface ProductData {
  type: string;
  title: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

export interface Props extends RectButtonProps {
  data: CarModel;
}

export function Product({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <ProductType>{data.brand}</ProductType>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>
          <Type>
            <MotorIcon width={24} height={24} />
          </Type>
        </About>
      </Details>
      <ProductImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="cover"
      />
    </Container>
  );
}
