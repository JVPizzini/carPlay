import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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

interface FormProps {
  email: string;
  password: string;
  name: string;
  cnh: string;
}

export function SignUpFirstStep() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnh, setCnh] = useState("");

  const [status, setStatus] = useState<ErrorProps[]>([]);
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("E-mail is required"),
    cnh: Yup.string().required("Password is required"),
  });

  async function validate(obj: FormProps) {
    try {
      await schema.validate(obj, { abortEarly: false });
      return true;
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
    const obj: FormProps = {
      email: email,
      password: "",
      name: name,
      cnh: cnh,
    };

    if (!validate(obj)) return;

    // navigation.navigate("SignUpSecondStep");
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    console.log(status);
  }, [status]);
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
              <Title>Create your {"\n"}account</Title>
              <SubTitle>Do your account {"\n"} fast and easy</SubTitle>

              <Form>
                <TitleForm>1. Data</TitleForm>
                <Input
                  iconName="user"
                  placeholder="Name"
                  placeholderTextColor={colors.background}
                  onChangeText={setName}
                  value={name}
                />
                <Input
                  iconName="mail"
                  placeholder="E-mail"
                  placeholderTextColor={colors.background}
                  onChangeText={setEmail}
                  value={email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  placeholderTextColor={colors.background}
                  onChangeText={setCnh}
                  value={cnh}
                />
              </Form>
            </Content>
            <Footer>
              <Button
                title="Next"
                color={colors.bookplay_New}
                onPress={handleNextStep}
              />
            </Footer>
          </ScrollView>
        </TouchableWithoutFeedback>
      </Container>
    </KeyboardAvoidingView>
  );
}
