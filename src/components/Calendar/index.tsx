import React from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarProps,
  DateData,
} from "react-native-calendars";
import { RFValue } from "react-native-responsive-fontsize";
import { ptBR } from "./localeConfig";
import { generateInterval } from "./generateInterval";

LocaleConfig.locales["pt-BR"] = ptBR;
LocaleConfig.defaultLocale = "pt-BR";

//interfaces and types
interface MarkedDateProps {
  [data: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={RFValue(24)}
          color={theme.colors.text}
          name={direction === "right" ? "chevron-right" : "chevron-left"}
        />
      )}
      headerStyle={{
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.background,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.regular,
        textDayHeaderFontFamily: theme.fonts.regular,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.bold,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: 15,
        },
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    ></CustomCalendar>
  );
}

export { Calendar, MarkedDateProps, DateData, generateInterval };
