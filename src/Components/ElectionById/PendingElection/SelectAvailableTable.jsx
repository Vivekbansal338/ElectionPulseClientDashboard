import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AvailableTable from "../AvailableTable";
import SelectedTable from "../SelectedTable";

const SelectAvailableTable = () => {
  const [value, setValue] = useState(null);

  const items = [
    { name: "All Available Seats", value: 1, icon: "pi pi-external-link" },
    { name: "Manage Selected Seats", value: 2, icon: "pi pi-external-link" },
  ];

  function handleclick(e) {
    setValue(e.value);
  }

  const justifyTemplate = (option) => {
    return (
      <Button
        label={option.name}
        icon="pi pi-external-link"
        rounded
        style={{
          width: "250px",
          borderRadius: "10px",
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <SelectButton
          value={value}
          itemTemplate={justifyTemplate}
          onChange={(e) => handleclick(e)}
          optionLabel="name"
          options={items}
          multiple
        />
      </div>

      <div className="card">
        <Dialog
          visible={value}
          style={{ width: "100%", height: "100%" }}
          maximizable
          modal
          onHide={() => setValue(null)}
          headerStyle={{
            padding: "5px",
          }}
        >
          {value && value.includes(1) && (
            <AvailableTable showAvailable={value ? value.includes(1) : false} />
          )}
          {value && value.includes(2) && (
            <SelectedTable showSelected={value ? value.includes(2) : false} />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default SelectAvailableTable;
