import { ITask, IUpdModel } from "constants/types";

export interface ITaskFieldProps {
  blankId: number;
  data: ITask;
  listCounter: number;
  onFieldChange: (data: IUpdModel) => void;
  handleKeyNavigation: (event: any, value?: string) => void;
}
