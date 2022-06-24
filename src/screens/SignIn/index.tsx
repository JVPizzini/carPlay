import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Header, Title, SubTitle, Form, Footer } from "./styles";

export function SignIn() {
  const { colors } = useTheme();
  const [signIn, setSignIn] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {}

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        // containerStyle={{ flex: 1 }}
        // style={{ flex: 1 }}
      >
        <StatusBar style={"dark"} backgroundColor="transparent" />
        <Container>
          <Header>
            <Title>We're {"\n"}almost there</Title>
            <SubTitle>SignIn to start {"\n"} a amazing expirience</SubTitle>
          </Header>
          <Form>
            <Input
              iconName={"mail"}
              placeholder="E-mail"
              placeholderTextColor={colors.background}
              onChangeText={setSignIn}
        
            />
            <Input
              inputType="password"
              iconName={"lock"}
              placeholder="Password"
              placeholderTextColor={colors.background}
              onChangeText={setPassword}
 
            />
          </Form>
          <Footer>
            <Button
              title="SignIn"
              color={colors.bookplay_New}
              colorLoading={colors.shape}
              isLoading
              sizeLoading={"small"}
              onPress={() => {}}
            />
            <Button
              title="Create new account"
              color={colors.shape}
              light
              onPress={() => {}}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
