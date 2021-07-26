import { ITaskData, ITask, IInputKeyNavEvent } from "constants/types";

export interface IInputFieldProps {
  blankId: number;
  data: ITask;
  listCounter?: number;
  onBlur?: () => void;
  onFieldChange?: (data: ITaskData) => void;
  handleKeyNavigation?: (event: IInputKeyNavEvent, value?: string) => void;
  active: boolean;
  checkedStatus: boolean;
  setCheckedStatus: (boolean: boolean) => void;
  isDisabled: boolean;
  setIsDisabled: (boolean: boolean) => void;
}
