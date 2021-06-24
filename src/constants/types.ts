import { Moment } from "moment";

export interface IBlank {
  date: string;
  id: number;
  tasks: ITask[];
  timeStatus: string;
}
export interface ITask {
  id: number;
  value?: number;
  label?: string;
  done?: boolean;
  flag?: string;
}

export interface SomeTime {
  aMoment: Moment;
}
