import React from "react";

export const TenantName = ({ tenantName }) => {
  return (
    <header style={{ marginBottom: "10px" }}>
      <div
        style={{
          borderLeft: "4px solid orange",
          display: "block",
          padding: "4px 10px",
          fontSize: "1.1em",
        }}
      >
        Ticket System
        <strong style={{ marginLeft: "1ex" }}>{tenantName}</strong>
      </div>
    </header>
  );
};
