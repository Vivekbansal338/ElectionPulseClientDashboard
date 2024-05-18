import React, { useState } from "react";
import { Button } from "primereact/button";
import { useRemoveSeat } from "../../Hooks/Query/ElectionSeatQuery";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";

const ElectionSeatCard = ({ election, handleRemove, setdialog, status }) => {
  console.log("election", election);
  const [visible, setVisible] = useState(false);
  const { mutate: removeSeat, isPending: isRemoveSeatPending } =
    useRemoveSeat();
  const getStatusData = (status) => {
    switch (status) {
      case "Pending":
        return { color: "#f97316", icon: "pi pi-clock", severity: "warning" };
      case "Upcoming":
        return {
          color: "#17A2B8",
          icon: "pi pi-calendar-plus",
          severity: "info",
        };
      case "Ongoing":
        return {
          color: "#28A745",
          icon: "pi pi-spin pi-spinner",
          severity: "success",
        };
      case "Completed":
        return {
          color: "#6C757D",
          icon: "pi pi-check-circle",
          severity: "secondary",
        };
      default:
        return "default";
    }
  };

  const statusData = getStatusData(election.electionSeatStatus);

  const handleClick = () => {
    // console.log("Card clicked");
    // navigate("/election/" + election.id);
  };

  const handleInfoClick = (e) => {
    // e.stopPropagation();
    // setVisible(true);
  };

  const handleRemoveClick = (e) => {
    const formdata = {
      id: election.id,
    };
    removeSeat(
      {
        data: formdata,
      },
      {
        onSuccess: (data) => {
          if (data.success === false) return;
          handleRemove(election.id);
        },
      },
      {
        onError: () => {
          console.log("removeSeat", "error");
        },
      }
    );
  };

  return (
    <div
      className="border-1 surface-border border-round m-2 text-center py-5 px-3"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
        margin: "10px",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#fff",
        transition: "transform 0.3s",
        borderColor: statusData.color,
        boxShadow: `0 0 10px ${
          election.partyCount > 1 && election.employeeCount > 0
            ? statusData.color
            : "red"
        }`,
        cursor: "pointer",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3
            style={{
              margin: "0 0 10px",
              fontWeight: "600",
              fontSize: "18px",
              color: "#333",
            }}
          >
            {election.name}
          </h3>
          <h4
            style={{
              margin: "0 0 10px",
            }}
          >
            {election.state} - {election.seatType}
          </h4>
          <h4
            style={{
              margin: "0 0 10px",
            }}
          >
            {"Category " + election.seatReservedCategory}
          </h4>
        </div>
        <div>
          <i
            className={statusData.icon}
            style={{
              fontSize: "24px",
              color: statusData.color,
            }}
          />
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <h4
            style={{
              margin: "0 0 10px",
            }}
          >
            Employee Count
          </h4>
          <Badge
            value={election.employeeCount}
            severity={election.employeeCount > 0 ? "success" : "danger"}
            style={{ marginRight: "10px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h4
            style={{
              margin: "0 0 10px",
            }}
          >
            Party Count
          </h4>
          <Badge
            value={election.partyCount}
            severity={election.partyCount > 1 ? "success" : "danger"}
            style={{ marginRight: "10px" }}
          />
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          (Minimum 2 parties and 1 employee required)
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "auto",
          justifyContent: "space-between",
        }}
      >
        <Badge
          value={election.electionSeatStatus}
          severity={statusData.severity}
        />

        <i
          className="pi pi-info-circle"
          style={{ marginRight: "8px", cursor: "pointer" }}
          onClick={handleInfoClick}
        />
      </div>
      {status === "pending" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            label="Remove"
            severity="danger"
            onClick={() => setVisible(true)}
            className="p-button-sm"
          />

          <Button
            label="View"
            icon="pi pi-info-circle"
            onClick={handleClick}
            className="p-button-sm"
          />
        </div>
      )}

      {status === "pending" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            label="+/- Party"
            rounded
            severity="secondary"
            outlined
            style={{
              padding: "10px 5px",
              width: "100px",
            }}
            size="small"
            onClick={() =>
              setdialog({
                show: true,
                data: { ...election, electionSeatId: election.id },
                type: "party",
              })
            }
            aria-label="Add/Remove Party"
          />
          <Button
            label="+/- Employee"
            rounded
            severity="secondary"
            outlined
            size="small"
            style={{
              padding: "10px 5px",
              width: "110px",
            }}
            onClick={() =>
              setdialog({
                show: true,
                data: { ...election, electionSeatId: election.id },
                type: "employee",
              })
            }
            aria-label="Add/Remove Party"
          />
        </div>
      )}

      <Dialog
        visible={visible}
        style={{ width: "50rem" }}
        onHide={() => setVisible(false)}
        footer={
          <div>
            <Button
              label="Cancel"
              onClick={() => setVisible(false)}
              className="p-button-secondary"
              loading={isRemoveSeatPending}
              disabled={isRemoveSeatPending}
            />
            <Button
              label="Confirm"
              onClick={handleRemoveClick}
              autoFocus
              loading={isRemoveSeatPending}
              disabled={isRemoveSeatPending}
            />
          </div>
        }
      >
        <p className="m-0 mb-4">
          <strong>
            Are you sure you want to remove this seat from this election?
          </strong>
        </p>
      </Dialog>
    </div>
  );
};

export default ElectionSeatCard;
