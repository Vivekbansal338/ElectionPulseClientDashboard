import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";
import { Password } from "primereact/password";
import { stageTransitionDialogs } from "../../../Utils/Meesage";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useChangeElectionStatus } from "../../Hooks/Query/ElectionsQuery";

const items = [
  { label: "Pending", icon: "pi pi-clock", severity: "warning" },
  { label: "Upcoming", icon: "pi pi-calendar-plus", severity: "info" },
  { label: "Ongoing", icon: "pi pi-spin pi-spinner", severity: "success" },
  { label: "Completed", icon: "pi pi-check-circle", severity: "secondary" },
];

const StageTransitionComponent = ({ currentStage, onStageChange }) => {
  const { id: electionId } = useParams();
  const toast = useRef(null);
  const { isPending, mutate, isError, error } = useChangeElectionStatus();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // 'nextStage' or 'prevStage'
  const [password, setPassword] = useState("");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleStageChange = (type) => {
    setDialogType(type);
    setShowDialog(true);
  };

  const handleConfirm = () => {
    setShowPasswordDialog(true);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handlePasswordConfirm = () => {
    const formdata = {
      electionId: electionId,
      password,
      nextStatus: capitalizeFirstLetter(getNextStageItem().label),
    };

    mutate(
      {
        data: formdata,
      },
      {
        onSuccess: (data) => {
          if (data.success === false) {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: data.error,
              life: 3000,
            });
            return;
          }
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Election status updated successfully",
            life: 3000,
          });
          setShowDialog(false);
          setShowPasswordDialog(false);
          if (dialogType === "nextStage") {
            onStageChange("next");
          } else if (dialogType === "prevStage") {
            onStageChange("prev");
          }
          setPassword("");
        },
      },
      {
        onError: (error) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong",
            life: 3000,
          });
          setShowDialog(false);
          setShowPasswordDialog(false);
          setPassword("");
        },
      }
    );
  };

  const getStageTransitionDialog = () => {
    switch (dialogType) {
      case "nextStage":
        switch (currentStage) {
          case "pending":
            return stageTransitionDialogs.pendingToUpcoming;
          case "upcoming":
            return stageTransitionDialogs.upcomingToOngoing;
          case "ongoing":
            return stageTransitionDialogs.ongoingToCompleted;
          default:
            return "";
        }
      case "prevStage":
        return stageTransitionDialogs.upcomingToPending;
      default:
        return "";
    }
  };

  const stageTransitionDialog = getStageTransitionDialog();

  const getCurrentStageItem = () => {
    return items.find((item) => item.label.toLowerCase() === currentStage);
  };

  const getNextStageItem = () => {
    const currentIndex = items.findIndex(
      (item) => item.label.toLowerCase() === currentStage
    );
    if (dialogType === "prevStage") {
      return items[currentIndex - 1] || null;
    }
    return items[currentIndex + 1] || null;
  };

  return (
    <div
      className="card "
      style={{
        display: "flex",
        justifyContent: `${
          currentStage === "pending" ? "flex-end" : "space-between"
        }`,
        margin: "0 20px",
        marginBottom: "20px",
      }}
    >
      <Toast ref={toast} />
      {currentStage === "pending" && (
        <Button
          label="Move to Upcoming Stage"
          icon="pi pi-arrow-right"
          iconPos="right"
          severity="info"
          onClick={() => handleStageChange("nextStage")}
        />
      )}
      {currentStage === "upcoming" && (
        <>
          <Button
            label="Move to Pending Stage"
            icon="pi pi-arrow-left"
            severity="warning"
            onClick={() => handleStageChange("prevStage")}
            className="p-button-secondary ml-2"
          />
          <Button
            icon="pi pi-arrow-right"
            iconPos="right"
            severity="success"
            label="Move to Ongoing Stage"
            onClick={() => handleStageChange("nextStage")}
          />
        </>
      )}
      {currentStage === "ongoing" && (
        <Button
          label="Move to Completed Stage"
          severity="secondary"
          icon="pi pi-arrow-right"
          iconPos="right"
          onClick={() => handleStageChange("nextStage")}
        />
      )}
      <Dialog
        visible={showDialog}
        header={
          dialogType === "prevStage" ? (
            <div className="flex align-items-center justify-content-center">
              <Badge
                value={getNextStageItem()?.label || ""}
                severity={getNextStageItem()?.severity || ""}
                className="mr-2"
              />
              <i className={`${getNextStageItem()?.icon || ""} mr-2`} />

              <i className={"pi pi-arrow-left mr-2"} />
              <Badge
                value={getCurrentStageItem().label}
                severity={getCurrentStageItem().severity}
                className="mr-2"
              />
              <i className={`${getCurrentStageItem().icon} mr-2`} />
            </div>
          ) : (
            <div className="flex align-items-center justify-content-center">
              <Badge
                value={getCurrentStageItem().label}
                severity={getCurrentStageItem().severity}
                className="mr-2"
              />
              <i className={`${getCurrentStageItem().icon} mr-2`} />
              <i className={"pi pi-arrow-right mr-2"} />
              <Badge
                value={getNextStageItem()?.label || ""}
                severity={getNextStageItem()?.severity || ""}
                className="ml-2"
              />
              <i className={`${getNextStageItem()?.icon || ""} ml-2`} />
            </div>
          )
        }
        style={{ width: "50rem" }}
        onHide={() => setShowDialog(false)}
        footer={
          <div>
            <Button
              label="Cancel"
              onClick={() => setShowDialog(false)}
              className="p-button-secondary"
              loading={isPending}
              disabled={isPending}
            />
            <Button
              label="Confirm"
              onClick={handleConfirm}
              autoFocus
              loading={isPending}
              disabled={isPending}
            />
          </div>
        }
      >
        <p className="m-0 mb-4">
          <strong>{stageTransitionDialog}</strong>
        </p>
      </Dialog>
      <Dialog
        visible={showPasswordDialog}
        header="Enter Password"
        style={{ width: "30rem" }}
        onHide={() => setShowPasswordDialog(false)}
        footer={
          <div>
            <Button
              label="Cancel"
              onClick={() => setShowPasswordDialog(false)}
              className="p-button-secondary"
              loading={isPending}
              disabled={isPending}
            />
            <Button
              label="Confirm"
              onClick={handlePasswordConfirm}
              autoFocus
              disabled={!password || isPending}
              loading={isPending}
            />
          </div>
        }
      >
        <Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          feedback={false}
          placeholder="Enter your password"
          toggleMask
        />
      </Dialog>
    </div>
  );
};

export default StageTransitionComponent;
