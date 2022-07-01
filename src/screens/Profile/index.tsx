import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  Text,
} from "react-native";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";

//Components
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Error } from "../../components/Error";

//Styled-components
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";

//interface and types
interface ErrorProps {
  key: string;
  msg: string;
}

export function Profile() {
  const navigation = useNavigation();

  const { user, signOut, updatedUser } = useAuth();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const [options, setOptios] = useState<"dataEdit" | "passwordEdit">(
    "dataEdit"
  );

  const [status, setStatus] = useState<ErrorProps[]>([]);
  const imageDefault =
    "https://miro.medium.com/max/1200/1*g09N-jl7JtVjVZGcd-vL2g.jpeg";

  function handleOptionChance(optionsChance: "dataEdit" | "passwordEdit") {
    setOptios(optionsChance);
  }
  function handleBack() {
    navigation.goBack();
  }
  function handleLogOut() {
    Alert.alert(
      "SignOut",
      "When logging out, you have to be connected to the internet to log in again",
      [
        {
          text: "Cancel",
          onPress: () => {},
          
        },
        {
          text: "Logout",
          onPress: signOut,
        },
      ]
    );
  }
  async function handleSelectAvatar() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setAvatar(result.uri);
      }
    }
  }
  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("Driver license is required"),
        name: Yup.string().required("Name is required"),
      });

      const data = { name, driverLicense };
      await schema.validate(data, { abortEarly: false });

      setIsLoading(true);
      await updatedUser({
        name: name,
        driver_license: driverLicense,
        avatar: avatar,
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        token: user.token,
      });
      Alert.alert("Profile updated successfully");
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
    setTimeout(() => {
      {
        setIsLoading(false);
      }
    }, 3000);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={colors.shape} onPress={handleBack} />
              <HeaderTitle>Edit perfil</HeaderTitle>
              <LogoutButton onPress={handleLogOut}>
                <Feather name="power" size={24} color={colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              <Photo
                source={{
                  uri: avatar ? avatar : imageDefault,
                }}
              />
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content>
            <Options>
              <Option
                active={options === "dataEdit"}
                onPress={() => handleOptionChance("dataEdit")}
              >
                <OptionTitle active={options === "dataEdit"}>
                  User data
                </OptionTitle>
              </Option>
              <Option
                active={options === "passwordEdit"}
                onPress={() => handleOptionChance("passwordEdit")}
              >
                <OptionTitle active={options === "passwordEdit"}>
                  Chance password
                </OptionTitle>
              </Option>
            </Options>
            {options === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Name"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
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
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="Driver license"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
                {!driverLicense &&
                  status.map(
                    (item) =>
                      item.key === "driverLicense" && (
                        <Error key={item.key} msg={item.msg} />
                      )
                  )}
              </Section>
            ) : (
              <Section>
                <Input
                  iconName="lock"
                  placeholder="Old password"
                  inputType="password"
                />
                <Input
                  iconName="lock"
                  placeholder="New password"
                  editable={false}
                  inputType="password"
                />
                <Input
                  iconName="lock"
                  placeholder="Confirm new password"
                  inputType="password"
                />
              </Section>
            )}

            <Button
              title="Save"
              color={colors.bookplay_New}
              onPress={handleProfileUpdate}
              isLoading={isLoading}
              colorLoading={colors.shape}
              sizeLoading="small"
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
