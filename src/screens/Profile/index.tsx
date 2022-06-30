import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";
import * as ImagePicker from "expo-image-picker";

//Components
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

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

export function Profile() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [avatar, setAvatar] = useState(user.avatar);
  const [options, setOptios] = useState<"dataEdit" | "passwordEdit">(
    "dataEdit"
  );

  const imageDefault =
    "https://miro.medium.com/max/1200/1*g09N-jl7JtVjVZGcd-vL2g.jpeg";

  function handleOptionChance(optionsChance: "dataEdit" | "passwordEdit") {
    setOptios(optionsChance);
  }
  function handleBack() {
    navigation.goBack();
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
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={colors.shape} onPress={handleBack} />
              <HeaderTitle>Edit perfil</HeaderTitle>
              <LogoutButton onPress={signOut}>
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
                />
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
                />
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

            <Button title="Save" />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
