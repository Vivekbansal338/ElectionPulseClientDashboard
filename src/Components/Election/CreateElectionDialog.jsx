import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useCreateElection } from "../../Hooks/Query/ElectionsQuery";
import { Toast } from "primereact/toast";

const CreateElectionDialog = ({ visible, setVisible }) => {
  const { mutate, isPending, isError, error } = useCreateElection();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formvalid, setFormValid] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    if (
      name !== "" &&
      description !== "" &&
      startDate !== null &&
      endDate !== null &&
      startDate < endDate
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, description, startDate, endDate]);

  const clearform = () => {
    setDescription("");
    setStartDate(null);
    setEndDate(null);
    setName("");
    setVisible(false);
  };

  const handleCreateElection = () => {
    if (!formvalid) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill all the fields correctly",
        life: 2000,
      });
      return;
    }
    const formdata = {
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };

    mutate(
      { data: formdata },
      {
        onSuccess: (data) => {
          console.log("success", data);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Election Created Successfully",
            life: 2000,
          });
          clearform();
        },
        onError: (error) => {
          console.log("error", error);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Somthing went wrong. Please try again later.",
            life: 2000,
          });
          clearform();
        },
      }
    );
  };

  const footerContent = (
    <div
      style={{
        margin: "10px 10px 20px 10px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
      }}
    >
      <Button
        label="Cancel"
        disabled={isPending}
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />

      <Button
        label="Create"
        disabled={!formvalid}
        loading={isPending}
        icon="pi pi-check"
        onClick={handleCreateElection}
        className="p-button-success"
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Create New Election"
        visible={visible}
        style={{ width: "30rem" }}
        footer={footerContent}
        onHide={() => setVisible(false)}
      >
        <div
          className="p-fluid p-formgrid p-grid"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px",
          }}
        >
          <div className="p-field p-col-12">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Election Name"
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="description">Description</label>
            <InputText
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Election Description"
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="startDate">Start Date (Estimated)</label>
            <Calendar
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.value)}
              placeholder="Start Date"
              showIcon
              minDate={new Date()}
              maxDate={endDate === null ? null : endDate}
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="endDate">End Date (Estimated)</label>
            <Calendar
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              placeholder="End Date"
              showIcon
              minDate={startDate === null ? new Date() : startDate}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateElectionDialog;
