import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import {
  useRemoveSeat,
  useAddSeat,
  useAddPartyToSeat,
  useRemovePartyFromSeat,
} from "../../Hooks/Query/ElectionSeatQuery";
import { useGetAvailableParties } from "../../Hooks/Query/ElectionSeatQuery";

// electionSeatId: "662fdb09552324f2a9098e25";
// name: "Sarguja";
// partyCount: 0;
// reservedCategory: "ST";
// seatElectionStatus: "Pending";
// seatType: "Lok Sabha";
// state: "Chhattisgarh";
// status: "Active";
// _id: "662e7f654a76824dc8a5e2e7";

const AvailableParties = ({ setEmployeeDialog, showParties, seatData }) => {
  const { electionSeatId } = seatData;
  const { id: electionId } = useParams();
  const { mutate: addParty, isPending: isAddPartyPending } =
    useAddPartyToSeat();
  const { mutate: removeParty, isPending: isRemovePartyPending } =
    useRemovePartyFromSeat();
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
    isError: availableisErrorParties,
    error: availableerrorParties,
  } = useGetAvailableParties(showParties, electionSeatId);

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
        <span className="text-xl text-900 font-bold">All Parties</span>
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
        style={{
          padding: "8px",
        }}
      />
    );
  };

  const handleremoveparty = (id) => {
    const formdata = {
      partyId: id,
      id: electionSeatId,
    };
    removeParty(
      {
        data: formdata,
      },
      {
        onSuccess: (data) => {
          if (data.success === false) return;
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === formdata.partyId
                ? { ...product, alreadyAdded: false }
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

  const handleaddparty = (id) => {
    const formdata = {
      party: id,
      id: electionSeatId,
    };
    addParty(
      {
        data: formdata,
      },
      {
        onSuccess: (data) => {
          // if (data.success === false) return;
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === formdata.party
                ? {
                    ...product,
                    alreadyAdded: true,
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

  const handleSelectParty = (rowData) => {
    if (rowData.alreadyAdded) {
      handleremoveparty(rowData._id);
    } else {
      handleaddparty(rowData._id);
    }
  };

  const partyActionBodyTemplate = (rowData) => {
    return (
      <Button
        label={rowData.alreadyAdded ? "Remove Party" : "Add Party"}
        rounded
        // severity="secondary"
        outlined
        size="small"
        severity={rowData.alreadyAdded ? "danger" : "success"}
        loading={isAddPartyPending || isRemovePartyPending}
        disabled={isAddPartyPending || isRemovePartyPending}
        onClick={() => handleSelectParty(rowData)}
        // style={{
        //   padding: "7px",
        //   fontSize: "0.8rem",
        // }}
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

  const selectedTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.alreadyAdded ? "Added" : "Not Added"}
        severity={rowData.alreadyAdded ? "success" : "warning"}
      ></Tag>
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
        globalFilterFields={["name", "shortName", "symbol", "area"]}
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
        ></Column>
        <Column
          sortable
          field="shortName"
          header="Short Name"
          style={{
            maxWidth: "100px",
          }}
        ></Column>
        <Column
          sortable
          field="symbol"
          header="Symbol"
          style={{
            maxWidth: "100px",
          }}
        ></Column>
        <Column sortable field="area" header="Area"></Column>
        <Column sortable body={selectedTemplate} header="Party Added"></Column>
        <Column body={partyActionBodyTemplate} header="Party Action"></Column>
        <Column sortable body={statusBodyTemplate} header="Status"></Column>
        <Column body={actionBodyTemplate} header="Info"></Column>
      </DataTable>
    </div>
  );
};

export default AvailableParties;
