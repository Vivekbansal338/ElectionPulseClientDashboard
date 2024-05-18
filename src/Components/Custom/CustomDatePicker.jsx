import React from "react";
import { Calendar } from "primereact/calendar";

const CustomDatePicker = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <div className="p-field">
      {label && (
        <label htmlFor={id} className="p-mb-2">
          {label}
        </label>
      )}
      <Calendar
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="custom-datepicker"
        style={{ fontSize: "16px", padding: "10px" }}
        {...rest}
      />
    </div>
  );
};

export default CustomDatePicker;
