import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Input } from "../../components/Input";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import { Button } from "../../components/Button";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
  Text,
} from "./styles";

//interfaces and types
// interface SignInProps {
//   email: string;
//   password: string;
// }
interface ErrorProps {
  key: string;
  msg: string;
}

export function SignIn() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<ErrorProps[]>([]);

  const { signIn } = useAuth();

  const navigation = useNavigation();

  const schema = Yup.object().shape({
    email: Yup.string().required("E-mail is required"),
    password: Yup.string().required("Password is required"),
  });

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }

  async function handleSignIn() {
    try {
      await schema.validate({ email, password }, { abortEarly: false });
      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: ErrorProps[] = error.inner.map((e) => ({
          key: String(e.path),
          msg: e.message,
        }));

        setStatus(errors);
      } else {
        Alert.alert("Error: ", String(error));
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              onChangeText={setEmail}
              value={email}
            />
            {!email &&
              status.map(
                (item) =>
                  item.key === "email" && <Text key={item.key}>{item.msg}</Text>
              )}
            <Input
              inputType="password"
              iconName={"lock"}
              placeholder="Password"
              placeholderTextColor={colors.background}
              onChangeText={setPassword}
              value={password}
            />
            {!password &&
              status.map(
                (item) =>
                  item.key === "password" && (
                    <Text key={item.key}>{item.msg}</Text>
                  )
              )}
          </Form>
          <Footer>
            <Button
              title="SignIn"
              color={colors.bookplay_New}
              colorLoading={colors.shape}
              // isLoading
              sizeLoading={"small"}
              onPress={handleSignIn}
            />
            <Button
              title="Create new account"
              color={colors.shape}
              light
              onPress={handleNewAccount}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
