import { IBlank } from "../../constants/types";
import moment from "moment";

export const timeFormat = "L";
export const daysOfTheWeek = 7;
export const LSDataName = "letoAppData";
export const currentDate = moment();
export const blankDateFormat = "MMM DD[, ] YY";

export const updateStorage = (data: IBlank[]) => {
  localStorage.setItem(LSDataName, JSON.stringify(data));
};

export const compareAtPresentDay = (date: string) => {
  return moment(date).isSame(currentDate, "day");
};
export const compareAtPastDay = (date: string) => {
  return moment(date).isBefore(currentDate, "day");
};

export const compareAtFutureDay = (date: string) => {
  return moment(date).isAfter(currentDate, "day");
};

export const source = localStorage.getItem(LSDataName);
