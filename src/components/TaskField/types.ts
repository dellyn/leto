import { ITask } from "constants/types";

export interface ITaskFieldProps {
  blankId: number;
  data: ITask;
  listCounter: number;
  onFieldChange: (data: ITask) => void;
  handleEnter: (event: any, value?: string) => void;
}
