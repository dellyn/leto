import React, { useState } from "react";
import { IInputFieldProps } from "./types";

import "./styles.scss";
import "./checkbox.scss";

const InputField = (props: IInputFieldProps) => {
  const { data, onFieldChange } = props;

  const [fieldValue, setFieldValue] = useState(data.label);
  const [checkedStatus, setCheckedStatus] = useState(data.done);

  const onTextChange = (e: any) => {
    const { value } = e.target;
    setFieldValue(value);
    onFieldChange({ name: "label", value, id: data.id });
    if (!value) {
      setCheckedStatus(false);
      onFieldChange({ name: "done", value: false, id: data.id });
    }
  };

  const onDoneStatusChange = () => {
    if (fieldValue) {
      setCheckedStatus(!checkedStatus);
      onFieldChange({ name: "done", value: !checkedStatus, id: data.id });
    }
  };

  return (
    <div className={`input-field ${checkedStatus ? "done" : ""}`}>
      <span className="list-counter">{props.listCounter + 1}.</span>
      <input
        className="text"
        name="taskField"
        value={fieldValue}
        onChange={onTextChange}
        onBlur={props.onBlur}
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
