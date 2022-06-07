import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import api from "../../services/api";

//components
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

//styled-components
import {
  Container,
  Header,
  ProductImages,
  Content,
  Datails,
  Description,
  Company,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPricesDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";

//Utils
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

//interfaces and types
import { CarDTO } from "../../dtos/CarDTO";
import { RentalPeriodProps } from "../../screens/Scheduling";

interface Params {
  car: CarDTO;
  rentalPeriod: RentalPeriodProps;
  dates: string[];
}

export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car, rentalPeriod, dates } = route.params as Params;
  const [isLoading, setIsLoading] = useState(false);

  const rentData = {
    total: dates.length * car.rent.price,
    multiple: dates.length,
  };

  async function handleSchedulingComplete() {
    setIsLoading(true);
    const { data } = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [...data.unavailable_dates, ...dates];

    await api.post("schedules_byuser", {
      user_id: 1,
      car,
      rentalPeriod: rentalPeriod,
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailable_dates,
      })
      .then(() =>
        setTimeout(() => {
          {
            setIsLoading(false), navigation.navigate("SchedulingComplete");
          }
        }, 3000)
      )
      .catch(() => {
        Alert.alert(`it wasn't possible to complete the schedule`);
        setIsLoading(false);
      });
  }

  function handleBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <StatusBar translucent style="dark" />
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <ProductImages>
        <ImageSlider imagesUrl={car.photos} />
      </ProductImages>

      <Content>
        <Datails>
          <Description>
            <Company>{car.brand}</Company>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Datails>
        <Accessories>
          {car.accessories.map((accerrosy) => (
            <Accessory
              key={accerrosy.type}
              name={accerrosy.name}
              icon={getAccessoryIcon(accerrosy.type)}
            />
          ))}
        </Accessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>From</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>to</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPricesDetails>
            <RentalPriceQuota>
              {`R$ ${car.rent.price} x${rentData.multiple} daily`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentData.total}</RentalPriceTotal>
          </RentalPricesDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Rent now"
          color={theme.colors.sucess}
          onPress={handleSchedulingComplete}
          isLoading={isLoading}
          colorLoading={theme.colors.shape}
          sizeLoading={"small"}
          enabled={!isLoading}
        />
      </Footer>
    </Container>
  );
}
