import React, {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import moment from "moment";
import useSaveData from "../../helpers/useMount";
import { controlNumberOfTasks } from "helpers/helpers";
import TaskField from "components/TaskField/TaskField";
import { IBlank, ITask, IUpdModel } from "constants/types";
import { IBlankProps } from "./types";
import { triggerInput } from "helpers/helpers";
import { AdditionalPopup } from "../AdditionalPopup/AdditionalPopup";

import "./styles.scss";

const bottomArrowCode = 40;
const topArrowCode = 38;
const leftArrowCode = 37;
const enterCode = 13;
const deleteCode = 8;

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

  const taskFieldsKeyboardNavigation = useCallback((event, fieldValue) => {
    const form = formRef.current;

    if (form) {
      const currentInputCarretPosition = event.target.selectionStart;
      const index = Array.prototype.indexOf.call(form, event.target);
      // if form html structure will be changed it's possible to crash
      const inputsStep = 2;
      const prevInput = form.elements[index - inputsStep];
      const nextInput = form.elements[index + inputsStep];
      const currentInput = form.elements[index];

      if (fieldValue === "") {
        setNextFocusInputAfterDelete({ index });
      }

      const setCurrentCarretPosition = (el: HTMLInputElement) => {
        el.selectionEnd = el.selectionStart = currentInputCarretPosition;
      };

      switch (event.keyCode) {
        case enterCode:
          event.preventDefault();

          if (nextInput) {
            setCurrentCarretPosition(nextInput);
            nextInput.focus();
          }

          break;
        case deleteCode:
          //  why used uncotrolled acrtion? - currentInput
          if (currentInput.value.length === 0 && prevInput) {
            event.preventDefault();
            triggerInput(currentInput);
            prevInput.focus();
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
  }, []);

  useEffect(() => {
    if (nextFocusInput.index !== null) {
      formRef.current.elements[nextFocusInput.index].focus();
    }
  }, [nextFocusInput]);

  useEffect(() => {
    const initialFocus = () => {
      const firstInput = formRef.current.elements[0];
      const todayBlank = formRef && blankData.timeStatus === "present";
      if (todayBlank && !firstInput.value) {
        firstInput.focus();
      }
    };
    initialFocus();
  }, [blankData.timeStatus]);

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
            />
          );
        })}
      </form>
    </div>
  );
};

export default Blank;
