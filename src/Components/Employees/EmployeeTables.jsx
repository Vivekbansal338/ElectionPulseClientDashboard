import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import AllEmployeesTable from "./AllEmployeesTable";
import { Sidebar } from "primereact/sidebar";
import EmployeeRightSideBar from "./EmployeeRightSideBar";
// import SearchUserTable from "./SearchUserTable";

const EmployeeTables = () => {
  const [employeeDialog, setEmployeeDialog] = useState({
    visible: false,
    data: {},
  });
  const [outerinput, setOuterinput] = useState("");
  const [outersearch, setOutersearch] = useState("");

  const handleoutersearch = () => {
    if (outerinput.length > 0) {
      setOutersearch(outerinput);
    }
  };

  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <div
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h3>Employees</h3>

          <div
            className="flex justify-content-end"
            style={{
              marginTop: "5px",
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              className="p-input-icon-left ga-1"
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <InputText
                value={outerinput}
                onChange={(e) => setOuterinput(e.target.value)}
                placeholder="Search by name or email"
              />
              <Button
                label="Search"
                icon="pi pi-search"
                onClick={handleoutersearch}
              />
              {outersearch.length > 0 && (
                <Button
                  label="Clear"
                  icon="pi pi-times"
                  onClick={() => {
                    setOuterinput("");
                    setOutersearch("");
                  }}
                />
              )}
            </span>
          </div>
        </div>

        {outersearch === "" ? (
          <AllEmployeesTable setEmployeeDialog={setEmployeeDialog} />
        ) : // <SearchUserTable outersearch={outersearch} />
        null}
      </div>
      <Sidebar
        visible={employeeDialog.visible}
        position="right"
        onHide={() => {
          setEmployeeDialog({
            visible: false,
            data: {},
          });
        }}
        style={{ width: "350px" }}
      >
        <EmployeeRightSideBar employee={employeeDialog.data} />
      </Sidebar>
    </div>
  );
};

export default EmployeeTables;
