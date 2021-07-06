import React, { useState } from "react";
import { IInputFieldProps } from "./types";
import { inputFieldValidationRegEx } from "constants/constants";

import "./styles.scss";
import "./checkbox.scss";

const InputField = (props: IInputFieldProps) => {
  const { data, onFieldChange, listCounter, handleKeyNavigation, blankId } =
    props;

  const [fieldValue, setFieldValue] = useState(data.label);
  const [checkedStatus, setCheckedStatus] = useState<boolean>(data.done);

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(inputFieldValidationRegEx, " ");

    if (value) {
      onFieldChange({ name: "label", value: value });
    } else {
      setCheckedStatus(false);
      onFieldChange({ name: "done", value: false });
      onFieldChange({ name: "label", value: "" });
    }
    handleKeyNavigation(e, value);
    setFieldValue(value);
  };

  const onDoneStatusChange = () => {
    if (fieldValue) {
      setCheckedStatus(!checkedStatus);
      onFieldChange({ name: "done", value: !checkedStatus });
    }
  };

  const configClass = ` ${checkedStatus ? "done" : ""} ${
    props.active ? "active" : "inactive"
  }`;
  return (
    <div className={`input-field ${configClass}`}>
      <span className="list-counter">{listCounter + 1}.</span>
      <input
        className="text"
        name="taskField"
        value={fieldValue}
        onChange={onTextChange}
        onKeyDown={handleKeyNavigation}
        title={fieldValue}
      />
      <div className="custom-checkbox">
        <input
          id={`checkboxId${blankId}${data.id}`}
          type="checkbox"
          onChange={onDoneStatusChange}
          checked={checkedStatus}
        />
        <label htmlFor={`checkboxId${blankId}${data.id}`}>
          <span></span>
        </label>
      </div>
    </div>
  );
};

export default InputField;
