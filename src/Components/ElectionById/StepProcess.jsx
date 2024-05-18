import React, { useState, useRef, useEffect } from "react";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import ElectionByIdDialog from "./ElectionByIdDialog";
import {
  pendingStageMessages,
  upcomingStageMessages,
  ongoingStageMessages,
  completedStageMessages,
  stageTransitionDialogs,
} from "../../../Utils/Meesage";

export default function StepProcess({ status }) {
  const [visible, setVisible] = useState(false);
  const [messagedetails, setMessageDetails] = useState("");
  const toast = useRef(null);
  const [items, setItems] = useState([
    {
      label: "Pending",
      icon: "pi pi-clock",
      template: (item) => itemRenderer(item, 0),
      disabled: true,
      severity: "warning",
      backgroundColor: "#f97316",
      message: pendingStageMessages,
    },
    {
      label: "Upcoming",
      icon: "pi pi-calendar-plus",
      template: (item) => itemRenderer(item, 1),
      disabled: true,
      severity: "info",
      backgroundColor: "#0ea5e9",
      message: upcomingStageMessages,
    },
    {
      label: "Ongoing",
      icon: "pi pi-spin pi-spinner",
      disabled: true,
      template: (item) => itemRenderer(item, 2),
      severity: "success",
      backgroundColor: "#22c55e",
      message: ongoingStageMessages,
    },
    {
      label: "Completed",
      icon: "pi pi-check-circle",
      disabled: true,
      template: (item) => itemRenderer(item, 3),
      severity: "secondary",
      backgroundColor: "#64748b",
      message: completedStageMessages,
    },
  ]);

  useEffect(() => {
    if (status) {
      setItems((prevItems) => {
        const newItems = prevItems.map((item) => {
          if (item.label.toLowerCase() === status) {
            item.disabled = false;
            handleStepClick(item.label, item.severity, item.message, item.icon);
          }
          return item;
        });
        return newItems;
      });
    }
  }, [status]);

  const itemRenderer = (item, itemIndex) => {
    const backgroundColor = item.backgroundColor;
    const textColor = "var(--surface-b)";
    const secondaryTextColor = "var(--text-color-secondary)";

    return (
      <div className="flex flex-column align-items-center">
        <span
          className={`inline-flex align-items-center justify-content-center align-items-center border-circle border-1 h-3rem w-3rem z-1 cursor-pointer `}
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
          }}
          onClick={() =>
            handleStepClick(item.label, item.severity, item.message, item.icon)
          }
        >
          <i className={`${item.icon} text-xl`} />
        </span>
        <span className="mt-2 text-sm" style={{ color: secondaryTextColor }}>
          {item.label}
        </span>
      </div>
    );
  };

  const handleStepClick = (label, severity, message, icon) => {
    setVisible(true);
    setMessageDetails({ label, severity, message, icon });
  };

  return (
    <div className="card">
      <Toast ref={toast}></Toast>
      <Steps model={items} readOnly={false} className="m-2 pt-4 mb-6" />
      {messagedetails && (
        <ElectionByIdDialog
          visible={visible && messagedetails}
          setVisible={setVisible}
          data={messagedetails}
        />
      )}
    </div>
  );
}
