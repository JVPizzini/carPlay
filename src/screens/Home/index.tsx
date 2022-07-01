import React, { useEffect, useState } from "react";
import { Button as ButtonReact } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import { useNetInfo } from "@react-native-community/netinfo";
import api from "../../services/api";

//Animations
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

//api
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
import { Button } from "../../components/Button";
import { DoneAnimation } from "../../components/Animation/DoneAnimation";

//assets
import Bookplay from "../../assets/bookplay.svg";
import Kids from "../../assets/kids.svg";
import { BackHandler } from "react-native";

//database
import { Car as CarModel } from "../../database/model/Car";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const netInfo = useNetInfo();

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

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("ProductDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        if (user) {
          await api.post("/users/sync", user);
        }
      },
    });

    await fetchCars();
  }

  async function fetchCars() {
    try {
      const carCollection = database.get<CarModel>("cars");
      const cars = await carCollection.query().fetch();

      setCars(cars);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchCars();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);
  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Headers>
        <HeaderContent>
          <Bookplay width={RFValue(110)} height={RFValue(30)} />
          {!isLoading && <TotalCars>total {cars.length} cars </TotalCars>}
        </HeaderContent>
      </Headers>
      {/* <ButtonReact title="teste" onPress={offlineSynchronize} /> */}
      {isLoading ? (
        <Load />
      ) : (
        // <DoneAnimation />
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
