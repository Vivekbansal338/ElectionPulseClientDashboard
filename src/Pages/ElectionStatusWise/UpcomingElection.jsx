import React from "react";
import CountDownTimer from "../../Components/ElectionById/UpcomingElection/CountDownTimer";
import { useElectionById } from "../../Hooks/Query/ElectionsQuery";
import { useParams } from "react-router-dom";
import ElectionByIdSkeletion from "../PageSkeletons/ElectionByIdSkeleton";

const UpcomingElection = () => {
  const { id } = useParams();
  const {
    data: electionData,
    isPending: isElectionPending,
    isError: isElectionError,
    error: electionError,
  } = useElectionById(id);

  if (isElectionPending) {
    return <ElectionByIdSkeletion />;
  }

  // // Generate a random number of days from 2 to 365
  // const randomFutureDays = Math.floor(Math.random() * 3) + 2;

  // // Get tomorrow's date
  // const date = new Date();
  // date.setDate(date.getDate() + randomFutureDays);

  // // Format the date as MM/DD/YYYY
  // const startDate = `${
  //   date.getMonth() + 1
  // }/${date.getDate()}/${date.getFullYear()}`;

  return (
    <div>
      <CountDownTimer startDate={electionData?.data?.startDate} />
    </div>
  );
};

export default UpcomingElection;
