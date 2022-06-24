import React, { useState } from "react";
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
}

export function Input({ iconName, inputType = "signin", ...rest }: Props) {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleShowPassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <Container>
      {inputType === "password" ? (
        <BorderGradient error={password} colors={[""]}>
          <Content>
            <Feather
              name={iconName}
              size={18}
              color={email ? colors.bookplay_New : colors.text}
            />
            <InputText
              {...rest}
              secureTextEntry={isPasswordVisible}
              onChangeText={setPassword}
            />
            <ButtonPasswordVisible onPress={handleShowPassword}>
              <Feather
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={18}
                color={colors.bookplay_New}
              />
            </ButtonPasswordVisible>
          </Content>
        </BorderGradient>
      ) : (
        <BorderGradient error={email} colors={[""]}>
          <Feather
            name={iconName}
            size={18}
            color={password ? colors.bookplay_New : colors.text}
          />
          <InputText {...rest} onChangeText={setEmail} />
        </BorderGradient>
      )}
    </Container>
  );
}
