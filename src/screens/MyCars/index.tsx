import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import { Load } from "../../components/Load";
import { Product } from "../../components/Product";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { AntDesign } from "@expo/vector-icons";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointiments,
  AppointimentsTitle,
  AppointimentsQuantity,
  ProductWrapper,
  ProductFooter,
  ProductFooterTitle,
  ProductFooterDate,
  ProductFooterPeriod,
} from "./styles";

//interface ans types
interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  rentalPeriod: {
    startFormatted: string;
    endFormatted: string;
  };
}

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [period, sePeriod] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fecthCars() {
      try {
        const { data } = await api.get(`/schedules_byuser?user_id=1`);
        setCars(data);
        // console.log(data)
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    }

    fecthCars();
  }, []);

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
          style={{ width: 32, height: 32, marginTop: -35, marginBottom: 35 }}
        />
        <Title>
          your schedules {`\n`}
          are here
        </Title>
        <SubTitle>comfort, security and practicality</SubTitle>
      </Header>
      {isLoading ? (
        <Load />
      ) : (
        <Content>
          <Appointiments>
            <AppointimentsTitle>Schedules done</AppointimentsTitle>
            <AppointimentsQuantity> {cars.length} </AppointimentsQuantity>
          </Appointiments>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductWrapper>
                <Product data={item.car} />
                <ProductFooter>
                  <ProductFooterTitle>perido</ProductFooterTitle>
                  <ProductFooterPeriod>
                    <ProductFooterDate>
                      {item.rentalPeriod.startFormatted}
                    </ProductFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.background}
                      style={{ marginHorizontal: 10 }}
                    />
                    <ProductFooterDate>
                      {item.rentalPeriod.endFormatted}
                    </ProductFooterDate>
                  </ProductFooterPeriod>
                </ProductFooter>
              </ProductWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
