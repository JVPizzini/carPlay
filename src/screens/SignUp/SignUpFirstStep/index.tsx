import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ImagePropTypes,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import * as Yup from "yup";

//components
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Error } from "../../../components/Error";
import { ImageSlider } from "../../../components/ImageSlider";
import { Input } from "../../../components/Input";
import { useAuth } from "../../../hooks/auth";

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
  driver_license?: string;
}

export function SignUpFirstStep() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driveLicense, setDriveLicense] = useState("");
  const { user } = useAuth();
  const [status, setStatus] = useState<ErrorProps[]>([]);
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("E-mail is required"),
    driver_license: Yup.string().required("Drive license is required"),
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
      return false;
    }
  }

  async function handleNextStep() {
    const obj: FormProps = {
      email: email,
      password: "",
      name: name,
      driver_license: driveLicense,
    };
    if (!(await validate(obj))) return;

    try {
      setIsLoading(true);
      navigation.navigate("SignUpSecondStep", { user: obj });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  function handleBack() {
    navigation.goBack();
  }
  // useEffect(() => {
  //   console.log(user);
  // }, []);
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
                {!name &&
                  status.map(
                    (item) =>
                      item.key === "name" && (
                        <Error key={item.key} msg={item.msg} />
                      )
                  )}

                <Input
                  iconName="mail"
                  placeholder="E-mail"
                  placeholderTextColor={colors.background}
                  onChangeText={setEmail}
                  value={email}
                />
                {!email &&
                  status.map(
                    (item) =>
                      item.key === "email" && (
                        <Error key={item.key} msg={item.msg} />
                      )
                  )}

                <Input
                  iconName="credit-card"
                  placeholder="Drive license"
                  keyboardType="numeric"
                  placeholderTextColor={colors.background}
                  onChangeText={setDriveLicense}
                  value={driveLicense}
                />
                {!driveLicense &&
                  status.map(
                    (item) =>
                      item.key === "driver_license" && (
                        <Error key={item.key} msg={item.msg} />
                      )
                  )}
              </Form>
            </Content>
            <Footer>
              <Button
                title="Next"
                color={colors.bookplay_New}
                onPress={handleNextStep}
                isLoading={isLoading}
                sizeLoading="small"
                colorLoading={colors.shape}
              />
            </Footer>
          </ScrollView>
        </TouchableWithoutFeedback>
      </Container>
    </KeyboardAvoidingView>
  );
}
