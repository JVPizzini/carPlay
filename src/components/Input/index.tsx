import React, { useEffect, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { Feather } from "@expo/vector-icons";

//styled-component
import {
  Container,
  BorderGradient,
  InputText,
  Content,
  ButtonPasswordVisible,
} from "./styles";
import { useTheme } from "styled-components/native";

//interfaces and types
interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  inputType?: "signin" | "password";
  isFocused?: boolean;
}

export function Input({ iconName, inputType = "signin", ...rest }: Props) {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleShowPassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }
  function handleInputFocused() {
    setIsFocused(true);
  }
  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <Container>
      {inputType === "password" ? (
        <BorderGradient isFocused={isFocused}>
          <Content>
            <Feather
              name={iconName}
              size={18}
              color={rest.value ? colors.bookplay_New : colors.text}
            />
            <InputText
              {...rest}
              secureTextEntry={isPasswordVisible}
              onFocus={handleInputFocused}
              onBlur={handleInputBlur}
            />
            <ButtonPasswordVisible onPress={handleShowPassword}>
              <Feather
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={18}
                color={rest.value ? colors.bookplay_New : colors.text}
              />
            </ButtonPasswordVisible>
          </Content>
        </BorderGradient>
      ) : (
        <BorderGradient isFocused={isFocused}>
          <Feather
            name={iconName}
            size={18}
            color={rest.value ? colors.bookplay_New : colors.text}
          />
          <InputText
            {...rest}
            onFocus={handleInputFocused}
            onBlur={handleInputBlur}
          />
        </BorderGradient>
      )}
    </Container>
  );
}
