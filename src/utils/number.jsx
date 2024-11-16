import numeral from "numeral";
import moment from "moment/min/moment-with-locales.js";

export const numberFormat = (num) => {
  return numeral(num).format("0,0");
}

export const dateFormat = (date) => {
  return moment(date).locale("th").format("LL");
}