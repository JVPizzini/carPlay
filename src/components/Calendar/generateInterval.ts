import theme from "../../global/theme";
import { MarkedDateProps, DateData } from ".";
import { eachDayOfInterval, format } from "date-fns";

//Utils
import { getPlataformDate } from "../../utils/getPlataformeDate";

export function generateInterval(start: DateData, end: DateData) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlataformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.blue_medium100
            : theme.colors.blue_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.blue_light
            : theme.colors.blue_medium100,
      },
    };
  });

  return interval;
}
