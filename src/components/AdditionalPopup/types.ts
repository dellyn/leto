import { IBlank, ITask, IUpdModel } from "constants/types";

export interface IAdditionalPopupProps {
  data: IBlank;
  onFieldChange: (data: IUpdModel) => void;
}
