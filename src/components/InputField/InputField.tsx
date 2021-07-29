import React, { useRef, useState } from "react";
import { IInputFieldProps } from "./types";
import { inputFieldValidationRegEx } from "constants/constants";

import "./styles.scss";

type TodoClickEvent<T> = React.MouseEvent<T, MouseEvent>;

const TodoField = (props: IInputFieldProps) => {
  const {
    data,
    onFieldChange,
    handleKeyNavigation,
    blankId,
    active,
    checkedStatus,
    setCheckedStatus,
    isDisabled,
    setIsDisabled,
  } = props;

  const [fieldValue, setFieldValue] = useState<string>(data.label);
  const todoRef = useRef<HTMLInputElement>(null);

  const deleteTask = () => {
    onFieldChange({ name: "done", value: false });
    onFieldChange({ name: "label", value: "" });
  };

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(inputFieldValidationRegEx, " ");

    if (value) {
      onFieldChange({ name: "label", value: value });
    }

    handleKeyNavigation(e, value);
    setFieldValue(value);
  };

  const onDoneStatusChange = () => {
    if (fieldValue) {
      onFieldChange({ name: "done", value: !checkedStatus });
      setCheckedStatus(!checkedStatus);
    }
  };

  const handleTodoBlur = () => {
    active && setIsDisabled(true);
    if (!fieldValue) {
      deleteTask();
    }
  };

  const handleTodoFocus = () => {
    setIsDisabled(false);
  };

  const handleEditTodo = (e: TodoClickEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    todoRef.current.disabled = false;
    todoRef.current.selectionStart = todoRef.current.value?.length;
    todoRef.current.focus();
    setIsDisabled(false);
  };
  const handleDeleteTodo = (e: TodoClickEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    deleteTask();
    setFieldValue("");
  };

  const handleTodoClickEvent = (e: TodoClickEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const todoId = `input${blankId}${data.id}`;

  const canEditTodo = !checkedStatus && fieldValue.length > 0 && isDisabled;
  const canDeleteTodo = checkedStatus && fieldValue.length > 0;

  return (
    <div
      className={`input-field ${isDisabled && active ? "active" : "inactive"}`}
      onClick={onDoneStatusChange}
    >
      <input
        className="todo"
        id={todoId}
        value={fieldValue}
        title={fieldValue}
        onChange={handleTodoChange}
        onClick={handleTodoClickEvent}
        onBlur={handleTodoBlur}
        onFocus={handleTodoFocus}
        onKeyDown={handleKeyNavigation}
        disabled={isDisabled}
        ref={todoRef}
      />
      {canEditTodo && (
        <label
          htmlFor={todoId}
          className="todo-btn edit-btn"
          onClick={handleEditTodo}
        >
          &#9998;
        </label>
      )}
      {canDeleteTodo && (
        <label
          htmlFor={todoId}
          className="todo-btn delete-btn"
          onClick={handleDeleteTodo}
        >
          &#10006;
        </label>
      )}
    </div>
  );
};

export default TodoField;
