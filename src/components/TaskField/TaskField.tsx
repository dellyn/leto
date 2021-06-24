import React, { useState } from "react";
import InputField from "../InputField/InputField";

const TaskField = (props: any) => {
  const { data } = props;
  const [task, setTask] = useState(data);

  const onTaskChange = (data: any) => {
    setTask((prevData: any) => {
      const updatedData = { ...prevData, [data.name]: data.value };
      props.onFieldChange(updatedData);

      return updatedData;
    });
  };
  // const handleBlur = () => {
  //   props.onFieldChange(task);
  // };

  return (
    <div className="task-field">
      <InputField
        data={data}
        key={data.id}
        onFieldChange={onTaskChange}
        // onBlur={handleBlur}
        listCounter={props.listCounter}
        blankId={props.blankId}
      />
    </div>
  );
};

export default TaskField;
