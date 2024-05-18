import React from "react";
import { Skeleton } from "primereact/skeleton";

export default function ElectionByIdSkeletion() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Skeleton width="60%" height="3rem" className="mb-5"></Skeleton>
      <Skeleton width="200px" height="2.5rem" className="mb-5"></Skeleton>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Skeleton width="100%" height="400px" className="mb-2"></Skeleton>
        <Skeleton width="100%" height="400px" className="mb-2"></Skeleton>
      </div>
    </div>
  );
}
