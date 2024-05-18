import React from "react";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";

export default function MenuCard({ selectedItem, setSelectedItem, statsData }) {
  const itemRenderer = (item) => (
    <a
      className={`flex align-items-center p-menuitem-link ${
        selectedItem === item.label ? "bg-indigo-100 text-indigo-900" : ""
      }`}
      onClick={() => handleItemClick(item.label)}
    >
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && (
        <Badge
          className="ml-auto"
          value={item.badge}
          severity={item.severity}
        />
      )}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );

  const handleItemClick = (label) => {
    setSelectedItem(selectedItem === label ? null : label);
  };

  const items = [
    {
      label: "Pending",
      icon: "pi pi-clock",
      badge: statsData.pending,
      severity: "warning",
      template: itemRenderer,
    },
    {
      label: "Upcoming",
      icon: "pi pi-calendar-plus",
      badge: statsData.upcoming,
      severity: "info",
      template: itemRenderer,
    },
    {
      label: "Ongoing",
      icon: "pi pi-spin pi-spinner",
      badge: statsData.ongoing,
      severity: "success",
      template: itemRenderer,
    },
    {
      label: "Completed",
      icon: "pi pi-check-circle",
      badge: statsData.completed,
      severity: "secondary",
      template: itemRenderer,
    },
  ];

  return (
    <div
      className="card"
      style={{
        marginTop: "20px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Menubar model={items} />
    </div>
  );
}
