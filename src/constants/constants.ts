import { IBlank, ITask } from "./types";

export const inputFieldValidationRegEx = /\s\s+/g;
export const defaultNumberOfTasks = 1;

export const taskDefaultModel: ITask = {
  id: null,
  value: null,
  label: "",
  done: false,
  flag: "",
};

export const defaultTasksField = (): ITask[] => {
  const fieldsNumber = [...new Array(defaultNumberOfTasks).keys()];
  return fieldsNumber.map((id) => {
    const task = { ...taskDefaultModel, id };
    return task;
  });
};

export const blankDefaultModel: IBlank = {
  date: null,
  id: null,
  tasks: defaultTasksField(),
  timeStatus: null,
  additionalInfo: {
    label: "",
  },
};
