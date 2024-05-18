import React from "react";
import { Dropdown } from "primereact/dropdown";

export default function DropdownFilter({
  data,
  placeholder,
  selected,
  setSelected,
}) {
  const handleselection = (e) => {
    setSelected(e.value);
  };

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selected}
        onChange={handleselection}
        options={data}
        optionLabel="name"
        placeholder={placeholder}
        className="w-full md:w-14rem"
        checkmark={true}
        highlightOnSelect={false}
      />
    </div>
  );
}
