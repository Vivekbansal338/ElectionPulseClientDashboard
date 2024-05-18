import React from "react";
import { Outlet } from "react-router-dom";
import NavSideBar from "../Components/Common/NavSideBar";
import Header from "../Components/Common/Header";

const SideBarWithHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        padding: "0px 5px",
        gap: "10px",
        backgroundColor: "var(--surface-ground)",
      }}
    >
      <NavSideBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "5px",
          padding: "5px 0px",
        }}
      >
        <Header />
        <div
          style={{
            padding: "10px",
            height: "100%",
            overflowY: "auto",
            backgroundColor: "var(--surface-section)",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideBarWithHeader;
