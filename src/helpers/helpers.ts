import { taskDefaultModel, defaultNumberOfTasks } from "constants/constants";
import { IBlank, ITask } from "constants/types";

export const controlNumberOfTasks = (data: IBlank) => {
  const tasksArrLength = data.tasks.length;

  if (tasksArrLength >= defaultNumberOfTasks) {
    const numberOfFilledFields = data.tasks.reduce(
      (counter: number, task: ITask) => {
        return task.label ? counter + 1 : counter;
      },
      0
    );
    // add new field if all is full
    if (numberOfFilledFields === tasksArrLength) {
      const updatedTasks = data.tasks;
      const lastElementId = updatedTasks[updatedTasks.length - 1].id;

      updatedTasks.push({
        ...taskDefaultModel,
        id: lastElementId + 1,
      });
      return { ...data, tasks: updatedTasks };
    }
    // delete empty fields
    else if (numberOfFilledFields < tasksArrLength - 1) {
      const filteredBlankTasks = data.tasks.filter(
        (field: ITask, index: number) =>
          field.label || index === tasksArrLength - 1
      );
      return { ...data, tasks: filteredBlankTasks };
    } else {
      return data;
    }
  }
};

export const triggerInput = (inputField: any, enteredValue = "") => {
  const input = inputField;
  const lastValue = input.value;
  input.value = enteredValue;

  const event = new Event("input", { bubbles: true });
  const tracker = input._valueTracker!;

  console.log(tracker);

  if (tracker) {
    tracker.setValue(lastValue);
  }

  input.dispatchEvent(event);
};

export const controlViewSize = () => {};
