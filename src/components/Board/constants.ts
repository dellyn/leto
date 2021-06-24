import { IBlank } from "../../constants/types";

export const timeFormat = "L";
export const weekDaysCount = 7;
export const LSDataName = "letoAppData";
export const LSLastUpdateDateName = "letoLastUpdateDate";

export const updateStorage = (data: IBlank[]) => {
  localStorage.setItem(LSDataName, JSON.stringify(data));
};
