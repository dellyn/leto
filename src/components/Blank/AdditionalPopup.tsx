import React, { useState } from "react";
import { inputFieldValidationRegEx } from "constants/constants";

export const AdditionalPopup = (props: any) => {
  const { data } = props;

  const [value, setValue] = useState(data.additionalInfo.label);
  const [isOpen, setIsOpen] = useState(false);
  const handleTextAreaChange = (event: any) => {
    const value = event.target.value.replace(inputFieldValidationRegEx, " ");
    setValue(value);

    props.onFieldChange({
      name: event.target.name,
      value: { label: value },
    });
  };
  const handleOpenPopup = (e: any) => {
    console.log(e);
    setIsOpen(!isOpen);
  };

  return (
    <div className={`additional ${isOpen ? "active" : ""}`}>
      <span
        className={`additional-btn ${value.length > 3 ? "active " : ""}`}
        onClick={handleOpenPopup}
      >
        ...
      </span>
      <div className="additional-info" onMouseLeave={handleOpenPopup}>
        <h2>Additional Info</h2>
        <div className="content">
          <textarea
            name="additionalInfo"
            id={`textarea-blank${data.id}`}
            value={value}
            onChange={handleTextAreaChange}
            placeholder="Reminder..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};
