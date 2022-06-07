import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import {
  Container,
  ImageIndexes,
  ImageIndex,
  ProductImageWrapper,
  ProductImage,
} from "./styles";

interface Props {
  imagesUrl: string[];
}

interface ChanceImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChanceImageProps) => {
    const index = info.viewableItems[0].index;
    setImageIndex(index);
    // console.log(info);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <ImageIndex
            key={String(index)}
            active={index === imageIndex}
          ></ImageIndex>
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <ProductImageWrapper>
            <ProductImage source={{ uri: item }} resizeMode="contain" />
          </ProductImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
