import { Moment } from "moment";

export interface IBlank {
  date: string;
  id: number;
  tasks: ITask[];
  additionalInfo: {
    label: string;
  };
}

export interface ITask {
  id: number;
  value?: number;
  label?: string;
  done?: boolean;
  flag?: string;
}
export interface ITaskData {
  name: string;
  value: string | number | boolean;
  id?: number;
}

export interface SomeTime {
  aMoment: Moment;
}
export interface IUpdModel {
  name: string;
  value: any;
}

export type IInputKeyNavEvent = any;
// | React.KeyboardEvent<HTMLInputElement>
// | React.ChangeEvent<HTMLInputElement>;
