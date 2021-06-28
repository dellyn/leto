import { IBlank, ITask } from "constants/types";

export interface IBlankProps {
  data: IBlank;
  onSave: (data: IBlank) => void;
  handleEnter: (event: any, value?: string) => void;
}
