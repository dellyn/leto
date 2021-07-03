import { IBlank, ITask } from "constants/types";

export interface IBlankProps {
  data: IBlank;
  onSave: (data: IBlank) => void;
  handleKeyNavigation: (event: any, value?: string) => void;
}
