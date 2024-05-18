import React from "react";
import { InputText } from "primereact/inputtext";

const CustomInput = ({ label, id, value, onChange, placeholder, ...rest }) => {
  return (
    <div className="p-field">
      {label && (
        <label htmlFor={id} className="p-mb-2">
          {label}
        </label>
      )}
      <InputText
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="custom-input"
        style={{ fontSize: "16px", padding: "10px" }}
        {...rest}
      />
    </div>
  );
};

export default CustomInput;
