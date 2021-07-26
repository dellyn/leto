import { useRef, useState, useEffect } from "react";
import moment from "moment";
import TaskField from "components/TaskField/TaskField";
import useSaveData from "hooks/useMount";
import { AdditionalPopup } from "components/AdditionalPopup/AdditionalPopup";
import { controlNumberOfTasks } from "helpers/helpers";
import { IBlank, ITask, IUpdModel } from "constants/types";
import { IBlankProps } from "./types";
import useKeyboardNavigation from "../../hooks/useKeyboardNavigation";

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
  const { nextFocusInput, handleKeyNavigation } =
    useKeyboardNavigation(formRef);

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
      <p className="date">{moment(blankData.date).format("MMM DD[, ] YY")}</p>

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
              handleKeyNavigation={handleKeyNavigation}
              active={index !== blankData.tasks.length - 1}
            />
          );
        })}
      </form>
    </div>
  );
};

export default Blank;
