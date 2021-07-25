import { useState } from "react";
import { keyCodes } from "../components/Blank/constants";
import { triggerInput } from "helpers/helpers";
import { IInputKeyNavEvent } from "constants/types";

const useKeyboardNavigation = (formRef: any) => {
  const [nextFocusInput, setNextFocusInputAfterDelete] = useState({
    index: null,
  });

  const handleKeyNavigation = (
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
  return { nextFocusInput, handleKeyNavigation };
};

export default useKeyboardNavigation;
