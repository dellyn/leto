import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import TaskField from "components/TaskField/TaskField";
import useSaveData from "helpers/useMount";
import { AdditionalPopup } from "components/AdditionalPopup/AdditionalPopup";
import { keyCodes } from "./constants";
import { controlNumberOfTasks, triggerInput } from "helpers/helpers";
import { IBlank, ITask, IUpdModel, IInputKeyNavEvent } from "constants/types";
import { IBlankProps } from "./types";

import "./styles.scss";

const Blank = (props: IBlankProps) => {
  const { data, onSave } = props;

  const [blankData, setBlankData] = useState<IBlank>({
    tasks: data.tasks,
    id: data.id,
    date: data.date,
    timeStatus: data.timeStatus,
    additionalInfo: data.additionalInfo,
  });

  const dayOfWeek = moment(blankData.date).format("dddd");

  const formRef = useRef(null);
  const [nextFocusInput, setNextFocusInputAfterDelete] = useState({
    index: null,
  });

  const configData = (model: IUpdModel) => {
    if (model.name === "tasks") {
      const updatedTasks = blankData.tasks.map((task: ITask) => {
        return task.id === model.value.id ? model.value : task;
      });

      setBlankData((prevData) => {
        const copyData = { ...prevData, tasks: updatedTasks };
        const updatedData = controlNumberOfTasks(copyData);
        return updatedData;
      });
    } else {
      setBlankData((prevData) => {
        return { ...prevData, [model.name]: model.value };
      });
    }
  };

  const taskFieldsKeyboardNavigation = (
    event: IInputKeyNavEvent,
    fieldValue: string
  ) => {
    const form = formRef.current;

    if (form) {
      // currentTarget vs target
      const currentInputCarretPosition = event.currentTarget.selectionStart!;
      const index = Array.prototype.indexOf.call(form, event.target);
      // if form html structure will be changed it's possible to crash
      const inputsStep = 1;
      const prevInput = form.elements[index - inputsStep];
      const nextInput = form.elements[index + inputsStep];
      const currentInput = form.elements[index];

      if (fieldValue === "") {
        setNextFocusInputAfterDelete({ index });
      }

      const regularActions = (
        input: HTMLInputElement,
        cursorPos?: number,
        inputForTrigger?: HTMLInputElement
      ) => {
        event.preventDefault();
        input.disabled = false;
        if (inputForTrigger) triggerInput(inputForTrigger);
        if (cursorPos) input.selectionStart = cursorPos;
        input.focus();
      };
      switch (event.keyCode) {
        case keyCodes.enter:
          if (nextInput) {
            regularActions(nextInput, nextInput.value?.length);
          }

          break;
        case keyCodes.delete:
          //  if we start deleting from the last task, we go up, and if we delete the first task, we go down to the last one.

          // if (nextInput) {
          //   if (currentInput.value.length === 1) {
          //     setIsDisabled(false);
          //     regularActions(nextInput, nextInput.value?.length, currentInput);
          //   }
          // } else
          if (currentInput.value.length === 0 && prevInput) {
            regularActions(prevInput, prevInput.value?.length, currentInput);
          }

          break;
        case keyCodes.topArrow:
          if (prevInput) {
            regularActions(prevInput, prevInput.value?.length);
          }

          break;
        case keyCodes.bottomArrow:
          if (nextInput) {
            regularActions(nextInput, nextInput.value?.length);
          }

          break;
        case keyCodes.leftArrow:
          if (currentInputCarretPosition === 0 && prevInput) {
            regularActions(prevInput, prevInput.value?.length);
          }

          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (nextFocusInput.index !== null) {
      formRef.current.elements[nextFocusInput.index].focus();
    }
  }, [nextFocusInput]);

  useEffect(() => {
    const initialFocus = () => {
      const todayBlank = blankData.timeStatus === "present";
      if (todayBlank && formRef) {
        const form = formRef.current;
        const firstInput = form.elements[0];
        const lastInput = form.elements[form.elements.length - 1];

        if (!firstInput.value) {
          firstInput.focus();
        } else {
          lastInput.focus();
        }
      }
    };
    initialFocus();
  }, []);

  useSaveData(blankData, () => onSave(blankData));

  return (
    <div className={`blank ${blankData.timeStatus}`}>
      <h2 className="week-day">{dayOfWeek}</h2>
      <p className="date">{blankData.date}</p>

      <AdditionalPopup data={blankData} onFieldChange={configData} />

      <form className="fields-list scroll" ref={formRef}>
        {blankData.tasks.map((task, index) => {
          return (
            <TaskField
              data={task}
              key={index}
              listCounter={index}
              blankId={blankData.id}
              onFieldChange={configData}
              handleKeyNavigation={taskFieldsKeyboardNavigation}
              active={index !== blankData.tasks.length - 1}
            />
          );
        })}
      </form>
    </div>
  );
};

export default Blank;
