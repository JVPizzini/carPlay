import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageEditor,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import * as Yup from "yup";
import { CreateAccountNavigationProps } from "../../../../src/@types/navigation/navigation";

//components
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { ConfirmButton } from "../../../components/ConfirmButton";
import { Error } from "../../../components/Error";
import { ImageSlider } from "../../../components/ImageSlider";
import { Input } from "../../../components/Input";
import api from "../../../services/api";

//styled-components
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  TitleForm,
  Form,
  Content,
  Footer,
} from "./styles";

//interfaces and types

interface ErrorProps {
  key: string;
  msg: string;
}

export function SignUpSecondStep() {
  const { colors } = useTheme();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params as CreateAccountNavigationProps;

  const [status, setStatus] = useState<ErrorProps[]>([]);

  const schema = Yup.object().shape({
    password: Yup.string().required("Name is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Confirm password is different"
    ),
  });

  async function validate(password: string, confirmPassword: string) {
    try {
      await schema.validate(
        { password, confirmPassword },
        { abortEarly: false }
      );
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: ErrorProps[] = error.inner.map((error) => ({
          key: String(error.path),
          msg: error.message,
        }));
        setStatus(errors);
      }
      return false;
    }
  }

  async function handleSave() {
    const newUser = {
      name: user.name,
      email: user.email,
      driver_license: user.driver_license,
      password: password,
    };
     
await api.get('/cars').then(response => console.log(response.data))

    if (!(await validate(password, confirmPassword))) return;

    setIsLoading(true);
    await api
      .post("/users", newUser)
      .then(() => {
        navigation.navigate("Complete", {
          Props: {
            title: "Account registred",
            msg: `Signin with your \n new account and enjoy `,
            screenName: "SignIn",
          },
        });
      })
      .catch((error) => {
        // console.log(error);
        Alert.alert("Deu ruim");
      });
    setIsLoading(false);
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <StatusBar barStyle="light-content" />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active={true} />
              <Bullet />
            </Steps>
          </Header>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Content>
              <Title>Make a {"\n"}account</Title>
              <SubTitle>Do your account {"\n"} fast and easy</SubTitle>

              <Form>
                <TitleForm>2. Password</TitleForm>
                <Input
                  iconName="lock"
                  placeholder="Password"
                  inputType="password"
                  placeholderTextColor={colors.background}
                  onChangeText={setPassword}
                  value={password}
                />
                {!password &&
                  status.map(
                    (item) =>
                      item.key === "password" && (
                        <Error key={item.key} msg={item.msg} />
                      )
                  )}
                <Input
                  iconName="lock"
                  placeholder="Confirm password"
                  inputType="password"
                  placeholderTextColor={colors.background}
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                />
                {confirmPassword != password &&
                  status.map(
                    (item) =>
                      item.key === "confirmPassword" && (
                        <Error key={item.key} msg={item.msg} />
                      )
                  )}
              </Form>
            </Content>

            <Footer>
              <Button
                title="Save"
                color={colors.sucess}
                onPress={handleSave}
                isLoading={isLoading}
                sizeLoading="small"
              />
            </Footer>
          </ScrollView>
        </TouchableWithoutFeedback>
      </Container>
    </KeyboardAvoidingView>
  );
}
