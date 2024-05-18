import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";

export default function ElectionByIdDialog({ visible, setVisible, data }) {
  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <Badge
        className="ml-auto"
        value={data.label}
        severity={data.severity}
        icon={data.icon}
      />
      {/* <span className="font-bold white-space-nowrap">Amy Elsner</span> */}
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "50rem" }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0 mb-4">
          <strong>{data.message.message1}</strong>
        </p>
        <p className="m-0">
          <strong>{data.message.message2}</strong>
        </p>
      </Dialog>
    </div>
  );
}
