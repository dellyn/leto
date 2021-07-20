import InputField from "../InputField/InputField";
import { ITaskData } from "constants/types";
import { ITaskFieldProps } from "./types";
import "./styles.scss";
import { useState } from "react";

const TaskField = (props: ITaskFieldProps) => {
  const {
    onFieldChange,
    data,
    handleKeyNavigation,
    listCounter,
    blankId,
    active,
  } = props;

  const [isEdit, setIsEdit] = useState(false);

  const onTaskChange = (task: ITaskData) => {
    const updatedData = { ...data, [task.name]: task.value };
    onFieldChange({ name: "tasks", value: updatedData });
  };

  const onTaskEdit = () => {
    setIsEdit(!isEdit);
  };
  const onDragAndDrop = () => {};

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
      <span onClick={onTaskEdit}>edit</span>
      <span onClick={onDragAndDrop}>move</span>
    </div>
  );
};

export default TaskField;
