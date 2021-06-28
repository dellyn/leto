import React, { useLayoutEffect, useRef, useState } from "react";
import moment from "moment";
import useSaveData from "../../helpers/useMount";
import { controlNumberOfTasks } from "helpers/helpers";
import TaskField from "components/TaskField/TaskField";
import { IBlank, ITask } from "constants/types";
import { IBlankProps } from "./types";
import "./styles.scss";
import { triggerInput } from "helpers/helpers";

const Blank = (props: IBlankProps) => {
  const { data, onSave } = props;

  const [blankData, setBlankData] = useState<IBlank>({
    tasks: data.tasks,
    id: data.id,
    date: data.date,
    timeStatus: data.timeStatus,
  });

  const weekDay = moment(blankData.date).format("dddd");

  const configData = (data: ITask) => {
    const updatedTasks = blankData.tasks.map((task: ITask) => {
      return task.id === data.id ? data : task;
    });

    setBlankData((prevData) => {
      const copyData = { ...prevData, tasks: updatedTasks };
      const updatedData = controlNumberOfTasks(copyData);
      return updatedData;
    });
  };

  useSaveData(blankData, () => onSave(blankData));
  const formRef = useRef(null);
  const [nextFocusInput, setNextFocusInputAfterDelete] = useState({
    index: null,
  });
  const taskFieldsKeyboardNavigation = React.useCallback(
    (event: any, fieldValue: string): void => {
      const bottomArrowCode = 40;
      const topArrowCode = 38;
      const leftArrowCode = 37;
      const enterCode = 13;
      const deleteCode = 8;
      const form = formRef.current;

      if (form) {
        const currentInputCarretPosition = event.target.selectionStart;
        const index = Array.prototype.indexOf.call(form, event.target);
        // if form html structure will be changed it's possible to crash
        const prevInput = form.elements[index - 2];
        const nextInput = form.elements[index + 2];
        const firstInput = form.elements[0];
        const currentInput = form.elements[index];

        if (fieldValue === "") {
          setNextFocusInputAfterDelete({ index });
        }

        const setCurrentCarretPosition = (el: HTMLInputElement) => {
          el.selectionEnd = el.selectionStart = currentInputCarretPosition;
        };

        switch (event.keyCode) {
          case enterCode:
            if (nextInput) {
              event.preventDefault();
              setCurrentCarretPosition(nextInput);
              nextInput.focus();
            }

            break;
          case deleteCode:
            //  why used uncotrolled acrtion? - currentInput
            if (currentInput.value.length === 0) {
              event.preventDefault();

              if (firstInput === document.activeElement) {
                triggerInput(firstInput);
                form.elements[0].focus();
              } else {
                triggerInput(currentInput);
                prevInput.focus();
              }
            }

            break;
          case topArrowCode:
            if (prevInput) {
              event.preventDefault();
              setCurrentCarretPosition(prevInput);
              prevInput.focus();
            }

            break;
          case bottomArrowCode:
            if (nextInput) {
              event.preventDefault();
              setCurrentCarretPosition(nextInput);
              nextInput.focus();
            }

            break;
          case leftArrowCode:
            if (currentInputCarretPosition === 0 && prevInput) {
              event.preventDefault();
              prevInput.selectionStart = 999;
              prevInput.focus();
            }

            break;
          default:
            break;
        }
      }
    },
    []
  );

  useLayoutEffect(() => {
    nextFocusInput.index &&
      formRef.current.elements[nextFocusInput.index]?.focus();
  }, [nextFocusInput]);
  return (
    <div className={`blank ${blankData.timeStatus}`}>
      <h2 className="week-day">{weekDay}</h2>
      <p className="date">{blankData.date}</p>

      <form className="fields-list scroll" ref={formRef}>
        {blankData.tasks.map((task: ITask, index: number) => {
          return (
            <TaskField
              data={task}
              key={index}
              listCounter={index}
              blankId={blankData.id}
              onFieldChange={configData}
              handleEnter={taskFieldsKeyboardNavigation}
            />
          );
        })}
      </form>
    </div>
  );
};

export default React.memo(Blank);
