import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import {
  useAddEmployeeToSeat,
  useRemoveEmployeeFromSeat,
} from "../../Hooks/Query/ElectionSeatQuery";
import { useGetAvailableEmployees } from "../../Hooks/Query/ElectionSeatQuery";

// electionId: "662fc936d9ab68cb2db7d9de";
// electionSeatId: "663039c6d6329d3bafb9dd99";
// employeeCount: 0;
// name: "Chandni Chowk";
// partyCount: 0;
// reservedCategory: "None";
// seatElectionStatus: "Pending";
// seatType: "Lok Sabha";
// state: "Delhi";
// status: "Active";
// _id: "662e7fe54a76824dc8a5e665";

const AvailableEmployees = ({ setEmployeeDialog, showEmployees, seatData }) => {
  console.log("seatData", seatData);
  const { electionSeatId, seatElectionStatus } = seatData;
  const { mutate: addEmployee, isPending: isAddEmployeePending } =
    useAddEmployeeToSeat();
  const { mutate: removeEmployee, isPending: isRemoveEmployeePending } =
    useRemoveEmployeeFromSeat();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perpage, setPerpage] = useState(0);
  const [totalpages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const {
    data,
    isPending: isLoading,
    isError: availableisErrorEmployees,
    error: availableerrorEmployees,
  } = useGetAvailableEmployees(showEmployees, electionSeatId);

  useEffect(() => {
    if (data) {
      setProducts(data?.data);
      setTotalPages(1);
      setPerpage(5);
    }
  }, [data]);

  const onPageChange = (event) => {
    const currentPageNumber = event.first / event.rows;
    setCurrentPage(currentPageNumber);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const handleClearFilters = () => {
    const value = "";
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-xl text-900 font-bold">All Employees</span>
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <span className="text-ms text-700 font-bold">{seatData?.name}</span>
          <span className="text-md text-700 font-bold">
            {seatData?.seatType}
          </span>
          <span className="text-ms text-700 font-bold">{seatData?.state}</span>
        </div>

        <div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
          <Button
            label="clear"
            onClick={handleClearFilters}
            style={{
              marginLeft: "10px",
            }}
          />
        </div>
      </div>
    );
  };

  const onViewClick = (rowData) => {};

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-info-circle"
        onClick={() => onViewClick(rowData)}
        size="small"
      />
    );
  };

  const handleremoveemployee = (id) => {
    const formdata = {
      employeeId: id,
      electionSeatId: electionSeatId,
    };
    removeEmployee(
      {
        data: formdata,
      },
      {
        onSuccess: (data) => {
          if (data.success === false) return;
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === formdata.employeeId
                ? {
                    ...product,
                    alreadyAdded: false,
                    electionStats: {
                      pending:
                        seatElectionStatus === "Pending"
                          ? product.electionStats.pending - 1
                          : product.electionStats.pending,
                      upcoming:
                        seatElectionStatus === "Upcoming"
                          ? product.electionStats.upcoming - 1
                          : product.electionStats.upcoming,
                      ongoing:
                        seatElectionStatus === "Ongoing"
                          ? product.electionStats.ongoing - 1
                          : product.electionStats.ongoing,
                      completed:
                        seatElectionStatus === "Completed"
                          ? product.electionStats.completed - 1
                          : product.electionStats.completed,
                    },
                  }
                : product
            )
          );
        },
      },
      {
        onError: () => {
          console.log("removeSeat", "error");
        },
      }
    );
  };

  const handleaddemployee = (id) => {
    const formdata = {
      employeeId: id,
      electionSeatId: electionSeatId,
    };
    addEmployee(
      {
        data: formdata,
      },
      {
        onSuccess: (data) => {
          // if (data.success === false) return;
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === formdata.employeeId
                ? {
                    ...product,
                    alreadyAdded: true,
                    electionStats: {
                      pending:
                        seatElectionStatus === "Pending"
                          ? product.electionStats.pending + 1
                          : product.electionStats.pending,
                      upcoming:
                        seatElectionStatus === "Upcoming"
                          ? product.electionStats.upcoming + 1
                          : product.electionStats.upcoming,
                      ongoing:
                        seatElectionStatus === "Ongoing"
                          ? product.electionStats.ongoing + 1
                          : product.electionStats.ongoing,
                      completed:
                        seatElectionStatus === "Completed"
                          ? product.electionStats.completed + 1
                          : product.electionStats.completed,
                    },
                  }
                : product
            )
          );
        },
      },
      {
        onError: () => {
          console.log("addSeat", "error");
        },
      }
    );
  };

  const handleSelectEmployee = (rowData) => {
    if (rowData.alreadyAdded) {
      handleremoveemployee(rowData._id);
    } else {
      handleaddemployee(rowData._id);
    }
  };

  const employeeActionBodyTemplate = (rowData) => {
    return (
      <Button
        label={rowData.alreadyAdded ? "Remove Emp." : "Add Emp."}
        rounded
        // severity="secondary"
        outlined
        size="small"
        severity={rowData.alreadyAdded ? "danger" : "success"}
        loading={isAddEmployeePending || isRemoveEmployeePending}
        disabled={isAddEmployeePending || isRemoveEmployeePending}
        onClick={() => handleSelectEmployee(rowData)}
        style={{
          padding: "7px",
          fontSize: "0.8rem",
        }}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={rowData.status === "Active" ? "success" : "danger"}
      ></Tag>
    );
  };

  const verifyBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.verificationStatus}
        severity={
          rowData.verificationStatus === "Completed" ? "success" : "danger"
        }
      ></Tag>
    );
  };

  const selectedTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.alreadyAdded ? "Added" : "Not Added"}
        severity={rowData.alreadyAdded ? "success" : "warning"}
      ></Tag>
    );
  };

  const preferedSeatTemplate = (rowData) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Tag
          value={"LokSabha :" + rowData.preferedLokSabhaSeat}
          severity="secondary"
        ></Tag>
        <Tag
          value={"VidhanSabha :" + rowData.preferedVidhanSabhaSeat}
          severity="secondary"
        ></Tag>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div
      className="card"
      style={
        {
          // width: "100%",
          // boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          // borderRadius: "15px",
          // padding: "15px",
          // backgroundColor: "white",
        }
      }
    >
      <DataTable
        size="small"
        value={products}
        filters={filters}
        paginator
        resizableColumns
        showGridlines
        rows={perpage}
        stripedRows
        scrollable
        scrollHeight="400px"
        tableStyle={{
          minWidth: "50rem",
        }}
        onPage={onPageChange}
        first={currentPage * perpage}
        totalRecords={totalpages * perpage}
        loading={isLoading}
        header={header}
        globalFilterFields={["name", "role", "state"]}
        globalFilter={globalFilterValue}
        emptyMessage="No Available Seat Found."
      >
        <Column
          sortable
          field="name"
          header="Name"
          style={{
            maxWidth: "200px",
          }}
          headerStyle={{
            fontSize: "12px",
          }}
        ></Column>
        <Column
          sortable
          field="email"
          header="Email"
          style={{
            maxWidth: "100px",
          }}
          headerStyle={{
            fontSize: "12px",
          }}
        ></Column>
        <Column
          sortable
          body={(rowData) =>
            rowData.mobileNumber ? rowData.mobileNumber : "N/A"
          }
          header="Mobile"
          style={{
            maxWidth: "80px",
          }}
          headerStyle={{
            fontSize: "12px",
          }}
        ></Column>
        <Column
          sortable
          field="role"
          header="Role"
          style={{
            maxWidth: "100px",
          }}
          headerStyle={{
            fontSize: "12px",
          }}
        ></Column>
        <Column
          sortable
          field="state"
          header="State"
          headerStyle={{
            fontSize: "12px",
          }}
        ></Column>
        <Column
          sortable
          body={preferedSeatTemplate}
          header="Prefered Seats"
          headerStyle={{
            fontSize: "12px",
          }}
        ></Column>

        <Column
          sortable
          field="electionStats.pending"
          header="Pending"
          headerStyle={{
            fontSize: "12px",
          }}
          style={{
            maxWidth: "60px",
          }}
        ></Column>
        <Column
          sortable
          field="electionStats.upcoming"
          header="Upcoming"
          headerStyle={{
            fontSize: "12px",
          }}
          style={{
            maxWidth: "60px",
          }}
        ></Column>
        <Column
          sortable
          field="electionStats.ongoing"
          header="Ongoing"
          headerStyle={{
            fontSize: "12px",
          }}
          style={{
            maxWidth: "60px",
          }}
        ></Column>
        <Column
          sortable
          field="electionStats.completed"
          header="Completed"
          headerStyle={{
            fontSize: "12px",
          }}
          style={{
            maxWidth: "60px",
          }}
        ></Column>
        <Column
          sortable
          body={selectedTemplate}
          header="Emp. Addeded"
          style={{
            maxWidth: "100px",
          }}
          headerStyle={{
            fontSize: "12px",
          }}
        ></Column>
        <Column
          body={employeeActionBodyTemplate}
          header="Emp. Action"
          style={{
            maxWidth: "120px",
          }}
          headerStyle={{
            fontSize: "12px",
          }}
        ></Column>

        <Column
          sortable
          body={statusBodyTemplate}
          header="Status"
          headerStyle={{
            fontSize: "12px",
          }}
          style={{
            maxWidth: "60px",
          }}
        ></Column>
        <Column
          sortable
          body={verifyBodyTemplate}
          header="Verification"
          headerStyle={{
            fontSize: "12px",
          }}
          style={{
            maxWidth: "80px",
          }}
        ></Column>
        <Column
          body={actionBodyTemplate}
          header="Info"
          headerStyle={{
            fontSize: "12px",
          }}
          style={{
            maxWidth: "60px",
          }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default AvailableEmployees;

// "_id": "662e13fb4090226cf54c9ea5",
//             "name": "Vivek", //
//             "email": "juliette.brovfvfvfvwn@example.com", //
//             "role": "Collector", //
//             "profileImage": "https://robohash.org/Trace.png?set=set2", //info
//             "status": "Active",      //
//             "verificationStatus": "Pending", //
// "preferedLokSabhaSeat": "Unknown",  //
// "preferedVidhanSabhaSeat": "Unknown", //
// "state": "Unknown", //
//             "mobileNumber": "",
//             "alreadyAdded": false, //
//             "electionStats": {
//                 "pending": 0,  //
//                 "upcoming": 0,//
//                 "ongoing": 0,//
//                 "completed": 0//
//             }
