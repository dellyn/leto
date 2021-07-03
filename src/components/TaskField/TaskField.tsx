import InputField from "../InputField/InputField";
import { ITaskData } from "constants/types";
import { ITaskFieldProps } from "./types";
const TaskField = (props: ITaskFieldProps) => {
  const { onFieldChange, data, handleKeyNavigation, listCounter, blankId } =
    props;

  const onTaskChange = (task: ITaskData) => {
    const updatedData = { ...data, [task.name]: task.value };
    onFieldChange({ name: "tasks", value: updatedData });
  };

  return (
    <div className="task-field">
      <InputField
        data={data}
        key={data.id}
        onFieldChange={onTaskChange}
        handleKeyNavigation={handleKeyNavigation}
        listCounter={listCounter}
        blankId={blankId}
      />
    </div>
  );
};

export default TaskField;
