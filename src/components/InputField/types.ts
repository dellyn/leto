import { ITaskData, ITask } from "constants/types";

export interface IInputFieldProps {
  blankId: number;
  data: ITask;
  listCounter?: number;
  onBlur?: () => void;
  onFieldChange?: (data: ITaskData) => void;
  handleEnter?: (event: any) => void;
}
