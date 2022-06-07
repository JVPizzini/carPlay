import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "styled-components/native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { DateData } from "react-native-calendars";
import { format } from "date-fns";

//Styled-components
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

//components
import { Button } from "../../components/Button";
import { BackButton } from "../../components/BackButton";
import {
  Calendar,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";

//interfaces and types
export interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
  rentalPeriod: RentalPeriodProps;
}

//Svg
import RightArrow from "../../assets/right-arrow.svg";
import { getPlataformDate } from "../../utils/getPlataformeDate";
import { CarDTO } from "../../dtos/CarDTO";

export function Scheduling() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;
  const [selectedPeriod, setSelectedPeriod] = useState(false);

  function handlerSchedulingDetails() {
    setSelectedPeriod(false);

    navigation.navigate("SchedulingDetails", {
      car,
      rentalPeriod,
      dates: Object.keys(markedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlataformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlataformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }

  function isEmptyObject(obj: Object) {
    if (JSON.stringify(obj) === "{}") {
      setSelectedPeriod(false);
    } else {
      setSelectedPeriod(true);
    }
  }

  useFocusEffect(
    useCallback(() => {
      isEmptyObject(lastSelectedDate);
    }, [lastSelectedDate])
  );

  return (
    <Container>
      <Header>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
          style={{ width: 32, height: 32 }}
        />
        <Title>
          Choose the start{"\n"}
          and end date{"\n"}
          of the lease
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>From</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <RightArrow width={RFValue(32)} height={RFValue(32)} />

          <DateInfo>
            <DateTitle>to</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar onDayPress={handleChangeDate} markedDates={markedDates} />
      </Content>
      <Footer>
        <Button
          title="Confirm"
          color={theme.colors.bookplay_New}
          onPress={handlerSchedulingDetails}
          enabled={selectedPeriod}
          style={{ opacity: selectedPeriod ? 1 : 0.7 }}
        />
      </Footer>
    </Container>
  );
}
