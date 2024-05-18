import React, { useEffect, useState, useRef } from "react";
import StepProcess from "../Components/ElectionById/StepProcess";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import ElectionByIdSkeletion from "./PageSkeletons/ElectionByIdSkeleton";
import { useGetElectionStatus } from "../Hooks/Query/ElectionByIdQuery";
import StageTransitionComponent from "../Components/ElectionById/StageTransitionComponent";
import { useElectionById } from "../Hooks/Query/ElectionsQuery";
import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";
import SeatsPanel from "../Components/ElectionById/PendingElection/SeatsPanel";
import GraphsPanel from "../Components/ElectionById/PendingElection/GraphsPanel";
import TestGeoJSON from "./TestGeoJson";
import BasicInfo from "../Components/ElectionById/Common/BasicInfo";

const ElectionById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const toast = useRef(null);
  const [reload, setReload] = useState(false);
  const { mutate, isPending, isError, error, reset } = useGetElectionStatus();
  const {
    data: electionData,
    isPending: isElectionPending,
    isError: isElectionError,
    error: electionError,
  } = useElectionById(id);

  function homenavigate() {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Something went wrong",
      life: 3000,
    });
    reset();
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (id) {
      const formdata = {
        id: id,
      };

      mutate(
        {
          data: formdata,
        },
        {
          onSuccess: (data) => {
            if (data.success == false) {
              homenavigate();
              return;
            }
            setStatus(data.data.status.toLowerCase());
            navigate(`/election/${id}/${data.data.status.toLowerCase()}`);
          },
        },
        {
          onError: () => {
            homenavigate();
          },
        }
      );
    }
  }, [id, navigate, reload]);

  const onStageChange = (type) => {
    setReload((prevReload) => !prevReload);
  };

  useEffect(() => {
    if (isError) {
      reset();
      navigate("/", { replace: true });
    }
  }, [isError]);

  if (isPending || isError) {
    return (
      <div>
        <ElectionByIdSkeletion />
      </div>
    );
  }

  return (
    <div className="p-d-flex p-flex-column p-ai-center p-mt-6">
      <Toast ref={toast} />
      <h6
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        Tags?
      </h6>
      <StepProcess status={status} />
      {status && (
        <StageTransitionComponent
          currentStage={status}
          onStageChange={onStageChange}
        />
      )}
      <Outlet />
      <TabView
        style={{
          width: "100%",
        }}
      >
        <TabPanel header="Selected Seats" rightIcon="pi pi-map-marker ml-2">
          <SeatsPanel status={status} />
        </TabPanel>
        <TabPanel header="Graphs" rightIcon="pi pi-chart-bar ml-2">
          <GraphsPanel />
        </TabPanel>
        <TabPanel header="Basic info" rightIcon="pi pi-info-circle ml-2">
          <BasicInfo />
        </TabPanel>
      </TabView>
      <div
        style={{
          width: "500px",
          height: "500px",
        }}
      >
        <TestGeoJSON />
      </div>
    </div>
  );
};

export default ElectionById;
