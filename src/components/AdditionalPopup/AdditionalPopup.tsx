import React, { useEffect, useRef, useState } from "react";
import { inputFieldValidationRegEx } from "constants/constants";
import { IAdditionalPopupProps } from "./types";

import "./styles.scss";

export const AdditionalPopup = (props: IAdditionalPopupProps) => {
  const { data, onFieldChange } = props;

  const [value, setValue] = useState(data.additionalInfo.label);
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef(null);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value.replace(inputFieldValidationRegEx, " ");
    setValue(value);

    onFieldChange({
      name: event.target.name,
      value: { label: value },
    });
  };
  const handleOpenPopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && isOpen) {
      textarea.focus();
      textarea.selectionStart = textarea.value.length;
    }
  }, [textareaRef, isOpen]);

  return (
    <div className={`additional ${isOpen ? "active" : ""}`}>
      <span
        className={`additional-btn ${value.length > 3 ? "active " : ""}`}
        onClick={handleOpenPopup}
      >
        ...
      </span>
      {isOpen && (
        <div className="additional-info" onMouseLeave={handleOpenPopup}>
          <h2>Additional Info</h2>
          <div className="content">
            <textarea
              name="additionalInfo"
              id={`textarea-blank${data.id}`}
              value={value}
              onChange={handleTextAreaChange}
              placeholder="Reminder..."
              ref={textareaRef}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};
