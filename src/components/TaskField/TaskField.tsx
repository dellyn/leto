import InputField from "../InputField/InputField";
import { ITaskData } from "constants/types";
import { ITaskFieldProps } from "./types";
import "./styles.scss";

const TaskField = (props: ITaskFieldProps) => {
  const {
    onFieldChange,
    data,
    handleKeyNavigation,
    listCounter,
    blankId,
    active,
  } = props;

  const onTaskChange = (task: ITaskData) => {
    const updatedData = { ...data, [task.name]: task.value };
    onFieldChange({ name: "tasks", value: updatedData });
  };

  return (
    <div className={`task-field ${active ? "active" : "inactive"}`}>
      <InputField
        data={data}
        key={data.id}
        onFieldChange={onTaskChange}
        handleKeyNavigation={handleKeyNavigation}
        listCounter={listCounter}
        blankId={blankId}
        active={active}
      />
    </div>
  );
};

export default TaskField;
