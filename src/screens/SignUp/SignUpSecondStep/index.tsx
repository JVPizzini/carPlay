import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import * as Yup from "yup";

//components
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { ImageSlider } from "../../../components/ImageSlider";
import { Input } from "../../../components/Input";

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
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [status, setStatus] = useState<ErrorProps[]>([]);
  const schema = Yup.object().shape({
    password: Yup.string().required("Name is required"),
  });

  async function validate(password: string) {
    try {
      await schema.validate(password, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: ErrorProps[] = error.inner.map((error) => ({
          key: String(error.path),
          msg: error.message,
        }));
        setStatus(errors);
      }
    }
  }

  function handleNextStep() {
    const obj = {};
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
                />
                <Input
                  iconName="lock"
                  placeholder="Confirm password"
                  inputType="password"
                  placeholderTextColor={colors.background}
                />
              </Form>
            </Content>

            <Footer>
              <Button
                title="Save"
                color={colors.bookplay_New}
                onPress={() => {}}
              />
            </Footer>
          </ScrollView>
        </TouchableWithoutFeedback>
      </Container>
    </KeyboardAvoidingView>
  );
}
