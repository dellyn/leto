import { ITask } from "constants/types";

export interface ITaskFieldProps {
  blankId: number;
  data: ITask;
  listCounter: number;
  onFieldChange: (data: any) => void;
  handleEnter: (event: any, value?: string) => void;
}
