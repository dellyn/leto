// import { triggerInput } from "helpers/helpers";
// import React, { useState } from "react";

// export const useKeyboardFieldsNavigation = ({ ref }) => {
//   const [nextFocusInputIndex, setNextFocusInputAfterDelete] = useState({
//     index: null,
//   });
//   const taskFieldsKeyboardNavigation = React.useCallback(
//     (event: any, fieldValue: string): void => {
//       const bottomArrow = 40;
//       const topArrow = 38;
//       const leftArrow = 37;
//       const enterKeyCode = 13;
//       const deleteKeyCode = 8;
//       const form = ref.current;

//       if (form) {
//         const currentInputCarretPosition = event.target.selectionStart;
//         const index = Array.prototype.indexOf.call(form, event.target);
//         // if form html structure will be changed it's possible to crash
//         const prevInputField = form.elements[index - 2];
//         const nextInputField = form.elements[index + 2];
//         const firstInputField = form.elements[0];
//         const inputField = form.elements[index];

//         if (fieldValue === "") {
//           setNextFocusInputAfterDelete({ index });
//         }

//         switch (event.keyCode) {
//           case enterKeyCode:
//             event.preventDefault();
//             nextInputField?.focus();

//             break;
//           case deleteKeyCode:
//             //  why used uncotrolled acrtion? - inputField
//             if (inputField.value.length === 0) {
//               event.preventDefault();

//               if (firstInputField === document.activeElement) {
//                 triggerInput(firstInputField);
//                 form.elements[0].focus();
//               } else {
//                 triggerInput(inputField);
//                 prevInputField.focus();
//               }
//             }

//             break;
//           case topArrow:
//             if (prevInputField) {
//               event.preventDefault();

//               prevInputField.selectionEnd = prevInputField.selectionStart =
//                 currentInputCarretPosition;

//               prevInputField.focus();
//             }

//             break;
//           case bottomArrow:
//             if (nextInputField) {
//               event.preventDefault();

//               nextInputField.selectionEnd = nextInputField.selectionStart =
//                 currentInputCarretPosition;

//               nextInputField.focus();
//             }

//             break;
//           case leftArrow:
//             if (currentInputCarretPosition === 0 && prevInputField) {
//               event.preventDefault();
//               prevInputField.selectionStart = 999;
//               prevInputField.focus();
//             }

//             break;
//           default:
//             break;
//         }
//       }
//     },
//     []
//   );
//   useLayoutEffect(() => {
//     ref.current.elements[nextFocusInputIndex.index]?.focus();
//     console.log(nextFocusInputIndex.index);
//   }, [nextFocusInputIndex]);
//   return <div></div>;
// };

import React from "react";

const useKeyboardFieldsNavigation = () => {
  return <div></div>;
};
