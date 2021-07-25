import React, { useState } from "react";
import { IInputFieldProps } from "./types";
import { inputFieldValidationRegEx } from "constants/constants";

import "./styles.scss";

const InputField = (props: IInputFieldProps) => {
  const { data, onFieldChange, handleKeyNavigation, blankId, active } = props;

  const [fieldValue, setFieldValue] = useState<string>(data.label);
  const [checkedStatus, setCheckedStatus] = useState<boolean>(data.done);
  const [isDisabled, setIsDisabled] = useState<boolean>(active);

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

  const handleBlur = () => {
    console.log("blur");

    active && setIsDisabled(true);
  };

  const handleFocus = () => {
    console.log("focus");

    setIsDisabled(false);
  };

  const handleEditTodo = (e: any) => {
    e.stopPropagation();
    setIsDisabled(false);
    e.target.focus();
    console.log("handleEditTodo", e);
  };
  const handleDeleteTodo = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    e.stopPropagation();
    console.log("delete");
  };
  const handleInputClickEvent = (e: any) => {
    console.log("handleInputClickEvent");
    e.stopPropagation();

    // e.target.selectionStart = e.target.value?.length;
  };

  const configClass = `${checkedStatus ? "done" : ""} 
  ${isDisabled ? "disabled" : "enabled"}`;

  const canEditTodo = !checkedStatus && fieldValue.length > 0 && isDisabled;
  const canDeleteTodo = checkedStatus && fieldValue.length > 0;

  return (
    <div className={`input-field ${configClass}`} onClick={onDoneStatusChange}>
      <input
        className="todo"
        name="taskField"
        value={fieldValue}
        onChange={onTextChange}
        onKeyDown={handleKeyNavigation}
        title={fieldValue}
        onClick={handleInputClickEvent}
        disabled={isDisabled}
        id={`input${blankId}${data.id}`}
        // onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {canEditTodo && (
        <label
          htmlFor={`input${blankId}${data.id}`}
          className="todo-btn edit-btn"
          onClick={handleEditTodo}
        >
          &#9998;
        </label>
      )}
      {canDeleteTodo && (
        <label
          htmlFor={`input${blankId}${data.id}`}
          className="todo-btn delete-btn"
          onClick={handleDeleteTodo}
        >
          &#10006;
        </label>
      )}
    </div>
  );
};

export default InputField;
