import { IBlank } from "../../constants/types";
import moment from "moment";

export const timeFormat = "L";
export const daysOfTheWeek = 7;
export const LSDataName = "letoAppData";
export const LSLastUpdateDateName = "letoLastUpdateDate";

export const updateStorage = (data: IBlank[]) => {
  localStorage.setItem(LSDataName, JSON.stringify(data));
};

export const currentDate = moment().format(timeFormat);
export const source = localStorage.getItem(LSDataName);
