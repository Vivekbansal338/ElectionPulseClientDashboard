import React from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./demo.css";
const NewElectionTimeLine = () => {
  const events = [
    {
      status: "Election Created",
      date: "15/10/2020 10:30",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0",
      desc: "Election Created Successfully",
    },
    {
      status: "Add Seats and Candidates",
      date: "15/10/2020 14:00",
      icon: "pi pi-cog",
      color: "#673AB7",
      desc: "Seats and Candidates Added Successfully",
    },
    {
      status: "Voting Started",
      date: "15/10/2020 16:15",
      icon: "pi pi-shopping-cart",
      color: "#FF9800",
    },
    {
      status: "Voting Ended",
      date: "16/10/2020 10:00",
      icon: "pi pi-check",
      color: "#607D8B",
    },
  ];

  const customizedMarker = (item) => {
    return (
      <span
        className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };

  const customizedContent = (item) => {
    return (
      <Card title={item.status} subTitle={item.date}>
        {item.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`}
            alt={item.name}
            width={200}
            className="shadow-1"
          />
        )}
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <Button label="Read more" className="p-button-text"></Button>
      </Card>
    );
  };

  return (
    <div className="card">
      <Timeline
        value={events}
        align="alternate"
        className="customized-timeline"
        marker={customizedMarker}
        content={customizedContent}
      />
    </div>
  );
};

export default NewElectionTimeLine;
