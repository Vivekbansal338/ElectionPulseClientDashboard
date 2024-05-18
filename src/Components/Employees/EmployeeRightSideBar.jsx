import React from "react";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";

const EmployeeRightSideBar = ({ employee, onUpdateStatus }) => {
  const navigate = useNavigate();
  const [displayDialog, setDisplayDialog] = React.useState(false);

  const handleUpdateStatus = (newStatus) => {
    onUpdateStatus(newStatus);
    setDisplayDialog(false);
  };

  const handleProfileClick = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <Image
          src={employee.profileImage}
          alt={employee.name}
          className="image"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "5px",
          marginBottom: "10px",
        }}
      >
        <Button
          label="Visit Profile"
          onClick={() => handleProfileClick(employee._id)}
          style={{
            width: "150px",
            padding: "10px 5px",
          }}
        />
        <Button
          label="Change Status"
          onClick={() => setDisplayDialog(true)}
          style={{
            width: "150px",
            padding: "10px 5px ",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <h3>{employee.name}</h3>
        <p>{employee.email}</p>
        <p>{employee.mobileNumber || "No Mobile Number"}</p>
        <p>
          <strong>Role:</strong> {employee.role}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <Tag
            value={employee.status}
            severity={employee.status === "Active" ? "success" : "danger"}
          />
        </p>
        <div
          style={{
            paddingBottom: "20px",
          }}
        >
          <strong>Verification Status:</strong>{" "}
          <Tag
            value={employee.verificationStatus}
            severity={
              employee.verificationStatus === "Completed" ? "success" : "danger"
            }
          />
        </div>
      </div>
      <Dialog
        visible={displayDialog}
        style={{ width: "450px" }}
        onHide={() => setDisplayDialog(false)}
        header={`Update ${employee.name}'s status`}
        modal
        footer={
          <div>
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setDisplayDialog(false)}
              className="p-button-text"
            />
            <Button
              label={employee.status === "Active" ? "Block" : "Activate"}
              icon={
                employee.status === "Active" ? "pi pi-times" : "pi pi-check"
              }
              onClick={() =>
                handleUpdateStatus(
                  employee.status === "Active" ? "Blocked" : "Active"
                )
              }
              autoFocus
            />
          </div>
        }
      >
        <p>
          Are you sure you want to{" "}
          {employee.status === "Active" ? "block" : "activate"} {employee.name}?
        </p>
      </Dialog>
    </section>
  );
};

export default EmployeeRightSideBar;
