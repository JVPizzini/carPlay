import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";


//Animations
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

//api
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

//styled-components
import {
  Container,
  Headers,
  TotalCars,
  HeaderContent,
  ProductList,
  MyCarsButton,
} from "./styles";

//components
import { Product } from "../../components/Product";
import { Load } from "../../components/Load";
import { DoneAnimation } from "../../components/Animation/DoneAnimation";

//assets
import Bookplay from "../../assets/bookplay.svg";
import Kids from "../../assets/kids.svg";
import { BackHandler } from "react-native";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const mycarButtonStytle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positicionX = positionX.value;
      ctx.positicionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positicionX + event.translationX;
      positionY.value = ctx.positicionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(positionY.value);
    },
  });

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", () => true);
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("ProductDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Headers>
        <HeaderContent>
          <Bookplay width={RFValue(110)} height={RFValue(30)} />
          {!isLoading && <TotalCars>total {cars.length} cars </TotalCars>}
        </HeaderContent>
      </Headers>
      {isLoading ? (
        <Load />
        // <DoneAnimation />
      ) : (
        <ProductList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Product data={item} onPress={() => handleCarDetails(item)} />
          )}
        ></ProductList>
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[mycarButtonStytle]}>
          <MyCarsButton onPress={handleOpenMyCars}>
            <Kids width={32} height={32} />
          </MyCarsButton>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}
