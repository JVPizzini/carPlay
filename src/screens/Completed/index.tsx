import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useWindowDimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

//Assets
import PlaySvg from "../../assets/play.svg";
import DoneSvg from "../../assets/verified.svg";

//Components
import { ConfirmButton } from "../../components/ConfirmButton";

//Styled-Components
import { Container, Content, Title, Message, Footer } from "./styles";
import { LogBox } from "react-native";

//interfaces and types
import { CompletedNavigationProps } from "../../../src/@types/navigation/navigation";

export function Completed() {
  const { width, height } = useWindowDimensions();
  const route = useRoute();

  const { Props } = route.params as CompletedNavigationProps;
  const navigation = useNavigation<any>();

  function handleHome() {
    navigation.navigate(Props.screenName ? Props.screenName : "Home");
  }

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  ]);

  return (
    <Container>
      <StatusBar translucent style="light" backgroundColor="transparent" />
      <PlaySvg
        width={width + RFValue(180)}
        height={height - RFValue(80)}
        style={{ marginTop: -50 }}
      />
      {/* <BookplaySvg
        width={width - RFValue(200)}
        height={height}
        style={{
          position: "absolute",
          marginLeft: RFValue(170),
          marginTop: RFValue(-270),
        }}
      /> */}

      <Content>
        <DoneSvg width={RFValue(100)} height={RFValue(100)} />
        {/* <DoneAnimation /> */}

        <Title>{Props.title ? Props.title : "Rented book"}</Title>
        <Message>
          {Props.msg
            ? Props.msg
            : 'Now you need to go{"\n"} to Bookplay Co.{"\n"} to get the book.'}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleHome} />
      </Footer>
    </Container>
  );
}
