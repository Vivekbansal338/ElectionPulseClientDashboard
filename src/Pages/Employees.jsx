import React, { useState } from "react";
import { Button } from "primereact/button";
import AddEmployeeDialog from "../Components/Employees/AddEmployeeDialog";
// import { useGetEmployees } from "../Hooks/Query/EmployeeQuery";
import EmployeeTables from "../Components/Employees/EmployeeTables";

const Employees = () => {
  const [visible, setVisible] = useState(false);
  // const {
  //   data,
  //   isError,
  //   error,
  //   isPending,
  //   isFetching,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useGetEmployees();

  return (
    <div className="p-d-flex p-flex-column p-ai-center p-mt-6">
      <Button
        label="Add New Employee"
        onClick={() => setVisible(true)}
        className="p-button-raised p-button-primary"
      />
      {/* <Button
        label="Get Next Page"
        loading={isFetchingNextPage || isFetching || isPending}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
        className="p-button-raised p-button-primary"
      /> */}
      <AddEmployeeDialog visible={visible} setVisible={setVisible} />
      <EmployeeTables />
    </div>
  );
};

export default Employees;
