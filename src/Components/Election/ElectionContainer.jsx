import React from "react";
import ElectionCard from "./ElectionCard";

const ElectionContainer = ({ selectedItem, electionsData }) => {
  console.log(selectedItem, electionsData);

  const filteredData = selectedItem
    ? electionsData.filter((election) => election.status === selectedItem)
    : electionsData;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      {filteredData.map((election) => (
        <ElectionCard election={election} key={election.id} />
      ))}
    </div>
  );
};

export default ElectionContainer;
