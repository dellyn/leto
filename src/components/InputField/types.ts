export interface IInputFieldProps {
  blankId: number;
  data: ITaskData;
  listCounter?: number;
  onBlur?: () => void;
  onFieldChange?: (data: ITaskData) => void;
}

export interface ITaskData {
  name: string;
  value: string | number | boolean;
  id?: number;
  label?: string;
  done?: boolean;
}
