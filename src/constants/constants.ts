import { ITask } from "./types";
import { updateStorage } from "components/Board/constants";

export const defaultNumberOfFields = 6;

export const taskDefaultModel: ITask = {
  id: null,
  value: null,
  label: "",
  done: false,
  flag: "",
};

export const defaultTasksField = (): ITask[] => {
  const fieldsNumber = [...new Array(defaultNumberOfFields).keys()];
  return fieldsNumber.map((index) => {
    const task = { ...defaultTasksField, id: index };
    return task;
  });
};
export const defaultModel: any = {
  date: null,
  id: null,
  tasks: defaultTasksField(),
  timeStatus: null,
};
