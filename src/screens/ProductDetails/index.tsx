import React from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

//components
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

// svgs
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
//styled-componets
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
  About,
  Accessories,
  Footer,
} from "./styles";

//interfaces and types
import { CarDTO } from "../../dtos/CarDTO";
interface Params {
  car: CarDTO;
}

export function ProductDetails() {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    // console.log(event.contentOffset.y);
  });
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 230],
        [230, 80],
        Extrapolate.CLAMP
      ),
    };
  });
  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handlerScheduling() {
    navigation.navigate("Scheduling", { car });
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar translucent style="dark" backgroundColor="transparent" />
      <Animated.View style={[headerStyleAnimation]}>
        <Header >
          <BackButton onPress={handleBack} />
        </Header>
        <Animated.View
          style={[sliderCarsStyleAnimation]}
        >
          <ProductImages>
            <ImageSlider imagesUrl={car.photos} />
          </ProductImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
     //paddingTop: getStatusBarHeight() - 20,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
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
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Choose the rental period"
          color={theme.colors.bookplay_New}
          onPress={handlerScheduling}
        />
      </Footer>
    </Container>
  );
}
