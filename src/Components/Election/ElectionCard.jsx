import React, { useState } from "react";
import { Badge } from "primereact/badge";
import { Dialog } from "primereact/dialog";
import { Knob } from "primereact/knob";
import { ProgressBar } from "primereact/progressbar";
import { useNavigate } from "react-router-dom";

const ElectionCard = ({ election }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
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

  const statusData = getStatusData(election.status);

  const handleClick = () => {
    console.log("Card clicked");
    navigate("/election/" + election.id);
  };

  const handleInfoClick = (e) => {
    // e.stopPropagation();
    // setVisible(true);
  };

  const progess =
    election.seatsCount === 0
      ? 0
      : (election.completedSeats / election.seatsCount) * 100;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
        margin: "10px",
        borderRadius: "10px",
        padding: "20px",
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        transition: "transform 0.3s",
        borderColor: statusData.color,
        // border: `1px solid ${statusData.color}`,
        boxShadow: `0 0 10px ${statusData.color}`,
        cursor: "pointer",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={handleClick}
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
          <p
            style={{
              margin: "0",
              fontWeight: "500",
              fontSize: "14px",
              color: "#555",
            }}
          >
            {new Date(election.startDate).toLocaleDateString()} -{" "}
            {new Date(election.endDate).toLocaleDateString()}
          </p>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Knob
          value={election.seatsCount}
          max={1000}
          thickness={0.2}
          strokeWidth={15}
          readOnly={true}
          valueColor={statusData.color}
          valueTemplate={"{value}"}
          showValue={true}
        />
        <p
          style={{
            margin: "0",
            fontWeight: "500",
            fontSize: "14px",
            color: "#555",
            textAlign: "center",
          }}
        >
          Seats Count
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          marginBottom: "10px",
          gap: "10px",
        }}
      >
        <ProgressBar value={progess} color={statusData.color} />
        <p
          style={{
            margin: "0",
            fontWeight: "500",
            fontSize: "14px",
            color: "#555",
            textAlign: "center",
          }}
        >
          % Seats Completed
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
        <Badge value={election.status} severity={statusData.severity} />

        <i
          className="pi pi-info-circle"
          style={{ marginRight: "8px", cursor: "pointer" }}
          onClick={handleInfoClick}
        />
      </div>
      <Dialog
        header={election.name}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p>{election.description}</p>
      </Dialog>
    </div>
  );
};

export default ElectionCard;
