import InputField from "../InputField/InputField";
import { ITaskData } from "constants/types";
import { ITaskFieldProps } from "./types";
import "./taskField.scss";
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

  const [checkedStatus, setCheckedStatus] = useState<boolean>(data.done);
  const [isDisabled, setIsDisabled] = useState<boolean>(active);

  const onTaskChange = (task: ITaskData) => {
    const updatedData = { ...data, [task.name]: task.value };
    onFieldChange({ name: "tasks", value: updatedData });
  };

  const configClasses = `${checkedStatus ? "done" : ""} ${
    isDisabled ? "disabled" : "enabled"
  }
  `;

  return (
    <div className={`task-field ${configClasses}`}>
      <span className="list-counter">{listCounter + 1}.</span>
      <InputField
        data={data}
        key={data.id}
        onFieldChange={onTaskChange}
        handleKeyNavigation={handleKeyNavigation}
        listCounter={listCounter}
        blankId={blankId}
        checkedStatus={checkedStatus}
        setCheckedStatus={setCheckedStatus}
        setIsDisabled={setIsDisabled}
        isDisabled={isDisabled}
        active={active}
      />
    </div>
  );
};

export default TaskField;
