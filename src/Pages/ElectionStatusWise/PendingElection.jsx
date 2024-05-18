import React from "react";
import SelectAvailableTable from "../../Components/ElectionById/PendingElection/SelectAvailableTable";
// import { TabView, TabPanel } from "primereact/tabview";
// import SeatsPanel from "../../Components/ElectionById/PendingElection/SeatsPanel";
// import GraphsPanel from "../../Components/ElectionById/PendingElection/GraphsPanel";

const PendingElection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "100%",
      }}
    >
      <SelectAvailableTable />
      {/* <TabView
        style={{
          width: "100%",
        }}
      >
        <TabPanel header="Selected Seats" rightIcon="pi pi-map-marker ml-2">
          <SeatsPanel />
        </TabPanel>
        <TabPanel header="Graphs" rightIcon="pi pi-chart-bar ml-2">
          <GraphsPanel />
        </TabPanel>
      </TabView> */}
    </div>
  );
};

export default PendingElection;
