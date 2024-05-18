import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useUpdateElection } from "../../../Hooks/Query/ElectionsQuery";
import { Toast } from "primereact/toast";
import { useElectionById } from "../../../Hooks/Query/ElectionsQuery";
import { useParams } from "react-router-dom";

const BasicInfo = ({ visible, setVisible }) => {
  const { id } = useParams();
  const {
    data: electionData,
    isPending: isElectionPending,
    isError: isElectionError,
    error: electionError,
  } = useElectionById(id);
  const { mutate, isPending, isError, error } = useUpdateElection();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formvalid, setFormValid] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    if (electionData) {
      setName(electionData.data.name);
      setDescription(electionData.data.description);
      setStartDate(new Date(electionData.data.startDate));
      setEndDate(new Date(electionData.data.endDate));
    }
  }, [electionData]);

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

  const handleUpdateElection = () => {
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
      id: id,
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };
    console.log("formdata", formdata);

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
          // clearform();
        },
        // onError: (error) => {
        //   console.log("error", error);
        //   toast.current.show({
        //     severity: "error",
        //     summary: "Error",
        //     detail: "Somthing went wrong. Please try again later.",
        //     life: 2000,
        //   });
        //   clearform();
        // },
      }
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <div
        className="p-fluid p-formgrid p-grid"
        style={{
          width: "50%",
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
            disabled={
              isElectionPending ||
              isPending ||
              electionData?.data?.status !== "Pending"
            }
          />
        </div>
        <div className="p-field p-col-12">
          <label htmlFor="description">Description</label>
          <InputText
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Election Description"
            disabled={
              isElectionPending ||
              isPending ||
              electionData?.data?.status !== "Pending"
            }
          />
        </div>
        <div className="p-field p-col-12">
          <label htmlFor="startDate">Start Date</label>
          <Calendar
            id="startDate"
            value={startDate}
            dateFormat="dd/mm/yy"
            onChange={(e) => setStartDate(e.value)}
            placeholder="Start Date"
            showIcon
            disabled={
              isElectionPending ||
              isPending ||
              electionData?.data?.status !== "Pending"
            }
            minDate={new Date()}
          />
        </div>
        <div className="p-field p-col-12">
          <label htmlFor="endDate">End Date</label>
          <Calendar
            id="endDate"
            value={endDate}
            dateFormat="dd/mm/yy"
            onChange={(e) => setEndDate(e.value)}
            placeholder="End Date"
            disabled={
              startDate === null ||
              isElectionPending ||
              isPending ||
              electionData?.data?.status !== "Pending"
            }
            showIcon
            // minDate={startDate === null ? new Date() : startDate}
          />
        </div>
        <div>
          <Button
            label="Update Election"
            onClick={handleUpdateElection}
            disabled={
              isElectionPending ||
              isPending ||
              electionData?.data?.status !== "Pending" ||
              !formvalid
            }
          />
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
