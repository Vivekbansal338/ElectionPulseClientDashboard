import React, { useState } from "react";
import { Button } from "primereact/button";
import CreateElectionDialog from "../Components/Election/CreateElectionDialog";
import MenuCard from "../Components/Election/MenuCard";
import ElectionContainer from "../Components/Election/ElectionContainer";
import { useElections } from "../Hooks/Query/ElectionsQuery";
import ElectionsSkeletion from "./PageSkeletons/ElectionsSkeleton";

const Elections = () => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { data, isPending, isError, error } = useElections();

  if (isPending) {
    return <ElectionsSkeletion />;
  }

  return (
    <div className="p-d-flex p-flex-column p-ai-center p-mt-6">
      <Button
        label="Create New Election"
        onClick={() => setVisible(true)}
        className="p-button-raised p-button-primary"
      />
      <MenuCard
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        statsData={data?.data?.stats || []}
      />
      <ElectionContainer
        selectedItem={selectedItem}
        electionsData={data?.data?.elections || []}
      />
      <CreateElectionDialog visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default Elections;
