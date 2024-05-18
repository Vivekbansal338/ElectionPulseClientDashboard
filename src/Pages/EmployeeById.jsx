import React from "react";
import { useParams } from "react-router-dom";

const EmployeeById = () => {
  const { id } = useParams();
  return (
    <div className="p-d-flex p-flex-column p-ai-center p-mt-6">
      <h1>Employee ID: {id}</h1>
    </div>
  );
};

export default EmployeeById;
