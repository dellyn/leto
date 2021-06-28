import React, { useState } from "react";
import { IInputFieldProps } from "./types";

import "./styles.scss";
import "./checkbox.scss";

const InputField = (props: IInputFieldProps) => {
  const { data, onFieldChange, listCounter, handleEnter } = props;

  const [fieldValue, setFieldValue] = useState(data.label);
  const [checkedStatus, setCheckedStatus] = useState<boolean>(!!data.done);

  const onTextChange = (e: any) => {
    const value = e.target.value.replace(/\s\s+/g, " ");

    if (value) {
      onFieldChange({ name: "label", value: value, id: data.id });
    } else {
      setCheckedStatus(false);
      onFieldChange({ name: "done", value: false, id: data.id });
      onFieldChange({ name: "label", value: "", id: data.id });
    }
    handleEnter(e, value);

    setFieldValue(value);
  };

  const onDoneStatusChange = () => {
    if (fieldValue) {
      setCheckedStatus(!checkedStatus);
      onFieldChange({ name: "done", value: !checkedStatus, id: data.id });
    }
  };

  return (
    <div className={`input-field ${checkedStatus ? "done" : ""}`}>
      <span className="list-counter">{listCounter + 1}.</span>
      <input
        className="text"
        name="taskField"
        value={fieldValue}
        onChange={onTextChange}
        onKeyDown={handleEnter}
      />
      <div className="custom-checkbox">
        <input
          id={`${data.id} ${props.blankId}`}
          type="checkbox"
          onChange={onDoneStatusChange}
          checked={checkedStatus}
        />
        <label htmlFor={`${data.id} ${props.blankId}`}>
          <span></span>
        </label>
      </div>
    </div>
  );
};

export default InputField;
