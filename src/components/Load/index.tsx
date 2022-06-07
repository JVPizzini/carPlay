import React from "react";
import { ActivityIndicator,ActivityIndicatorProps } from "react-native";
import { useTheme } from "styled-components/native";

interface LoadProps extends ActivityIndicatorProps {
  color?: string;
  size?: number | "large" | "small";
  flex?: number,
}

export function Load({ color, size,flex = 1}: LoadProps) {
  const theme = useTheme();

  return (
    <ActivityIndicator
      color={color ? color : theme.colors.bookplay_New}
      size={size ? size : "large"}
      style={{ flex: flex}}
  
    />
  );
}
