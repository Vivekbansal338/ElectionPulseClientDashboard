import React from "react";
import { Button } from "primereact/button";

const CustomButton = ({ label, icon, onClick, className, ...rest }) => {
  return (
    <Button
      label={label}
      icon={icon}
      onClick={onClick}
      className={`p-button-rounded custom-button ${className}`}
      style={{
        padding: "7px 14px",
        fontSize: "16px",
        fontWeight: "500",
        gap: "10px",
      }}
      {...rest}
    />
  );
};

export default CustomButton;
