import InputField from "../InputField/InputField";
import { ITaskData } from "constants/types";
import { ITaskFieldProps } from "./types";
const TaskField = (props: ITaskFieldProps) => {
  const onTaskChange = (data: ITaskData) => {
    const updatedData = { ...props.data, [data.name]: data.value };
    props.onFieldChange({ name: "tasks", value: updatedData });
  };

  return (
    <div className="task-field">
      <InputField
        data={props.data}
        key={props.data.id}
        onFieldChange={onTaskChange}
        handleEnter={props.handleEnter}
        listCounter={props.listCounter}
        blankId={props.blankId}
      />
    </div>
  );
};

export default TaskField;
