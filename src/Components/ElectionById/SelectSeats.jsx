import React, { useState, useEffect } from "react";
import { PickList } from "primereact/picklist";

// name: "Araku";
// reservedCategory: "ST";
// seatType: "Lok Sabha";
// state: "Andhra Pradesh";
// status: "Active";
// _id: "662e7f4d4a76824dc8a5e245";

export default function SelectSeats({ data }) {
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);

  useEffect(() => {
    setSource(data.availableSeats);
    // setTarget(data.includedSeats);
  }, []);

  const onChange = (event) => {
    setSource((prevSource) => {
      const sourcechange = Math.abs(prevSource.length - event.source.length);
      return sourcechange === 1 ? event.source : prevSource;
    });

    setTarget((prevTarget) => {
      const targetchange = Math.abs(prevTarget.length - event.target.length);
      return targetchange === 1 ? event.target : prevTarget;
    });
    // setSource(event.source);
    // setTarget(event.target);
  };

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>Category {item.reservedCategory}</span>
            <span>Status {item.status}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>{item.seatType}</span>
            <span>{item.state}</span>
          </div>
        </div>
        <span className="font-bold text-900">{item.price}</span>
      </div>
    );
  };

  return (
    <div className="card">
      <PickList
        dataKey="_id"
        source={source}
        target={target}
        onChange={onChange}
        itemTemplate={itemTemplate}
        filter
        filterBy="name,reservedCategory,seatType,state,status"
        breakpoint="1280px"
        sourceHeader="Available Seats"
        targetHeader="Selected Seats"
        sourceStyle={{ height: "24rem" }}
        targetStyle={{ height: "24rem" }}
        sourceFilterPlaceholder="Search by name"
        targetFilterPlaceholder="Search by name"
        showSourceControls={false}
        showTargetControls={false}
        moveAllToTargetIcon="null"
        moveAllToSourceIcon="null"
      />
    </div>
  );
}
