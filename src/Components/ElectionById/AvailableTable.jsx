import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import DropdownFilter from "./DropDownFilter";
import { useParams } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useRemoveSeat, useAddSeat } from "../../Hooks/Query/ElectionSeatQuery";
import { useGetAvailableSeatsByElectionId } from "../../Hooks/Query/ElectionSeatQuery";
const seatTypes = [{ name: "Lok Sabha" }, { name: "Vidhan Sabha" }];
const states = [
  { name: "Andaman and Nicobar Islands" },
  { name: "Andhra Pradesh" },
  { name: "Arunachal Pradesh" },
  { name: "Assam" },
  { name: "Bihar" },
  { name: "Chandigarh" },
  { name: "Chhattisgarh" },
  { name: "Dadra and Nagar Haveli" },
  { name: "Daman and Diu" },
  { name: "Delhi" },
  { name: "Goa" },
  { name: "Gujarat" },
  { name: "Haryana" },
  { name: "Himachal Pradesh" },
  { name: "Jammu and Kashmir" },
  { name: "Jharkhand" },
  { name: "Karnataka" },
  { name: "Kerala" },
  { name: "Ladakh" },
  { name: "Lakshadweep" },
  { name: "Madhya Pradesh" },
  { name: "Maharashtra" },
  { name: "Manipur" },
  { name: "Meghalaya" },
  { name: "Mizoram" },
  { name: "Nagaland" },
  { name: "Odisha" },
  { name: "Puducherry" },
  { name: "Punjab" },
  { name: "Rajasthan" },
  { name: "Sikkim" },
  { name: "Tamil Nadu" },
  { name: "Telangana" },
  { name: "Tripura" },
  { name: "Uttar Pradesh" },
  { name: "Uttarakhand" },
  { name: "West Bengal" },
];
const AvailableTable = ({ setEmployeeDialog, showAvailable = true }) => {
  const { id: electionId } = useParams();
  const { mutate: addSeat, isPending: isAddSeatPending } = useAddSeat();
  const { mutate: removeSeat, isPending: isRemoveSeatPending } =
    useRemoveSeat();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perpage, setPerpage] = useState(0);
  const [totalpages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [selectedState, setSelectedState] = useState({
    name: "Delhi",
  });
  const [selectedSeatType, setSelectedSeatType] = useState({
    name: "Lok Sabha",
  });
  const [searchfiltervalue, setSearchfiltervalue] = useState({
    state: "Delhi",
    seattype: "Lok Sabha",
  });

  const {
    data,
    isPending: isLoading,
    isError: availableisError,
    error: availableerror,
  } = useGetAvailableSeatsByElectionId(
    showAvailable,
    electionId,
    searchfiltervalue.seattype,
    searchfiltervalue.state
  );

  const handleapplyfilter = () => {
    if (selectedState == "" || selectedSeatType == "") {
      return;
    }

    setSearchfiltervalue({
      state: selectedState.name,
      seattype: selectedSeatType.name,
    });
  };

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
        <span className="text-xl text-900 font-bold">Available Seats</span>
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

  const onViewClick = (rowData) => {
    // setEmployeeDialog({
    //   visible: true,
    //   data: rowData,
    // });
  };

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

  const removeseat = (electionSeatId, id) => {
    const formdata = {
      id: electionSeatId,
    };
    removeSeat(
      {
        data: formdata,
      },
      {
        onSuccess: (data) => {
          if (data.success === false) return;
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === id
                ? { ...product, alreadySelected: false }
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

  const addseat = (id) => {
    const formdata = {
      election: electionId,
      seat: id,
    };
    addSeat(
      {
        data: formdata,
      },
      {
        onSuccess: (data) => {
          if (data.success === false) return;
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === formdata.seat
                ? {
                    ...product,
                    alreadySelected: true,
                    electionSeatId: data.data._id,
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

  const handleSelectSeat = (rowData) => {
    if (rowData.alreadySelected) {
      if (rowData.electionSeatId !== null) {
        removeseat(rowData.electionSeatId, rowData._id);
      }
    } else {
      addseat(rowData._id);
    }
  };

  const seatActionBodyTemplate = (rowData) => {
    return (
      <Button
        label={rowData.alreadySelected ? "Remove Seat" : "Add Seat"}
        severity={rowData.alreadySelected ? "danger" : "success"}
        loading={isAddSeatPending || isRemoveSeatPending}
        disabled={isAddSeatPending || isRemoveSeatPending}
        onClick={() => handleSelectSeat(rowData)}
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

  const selectedTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.alreadySelected ? "Selected" : "Not Selected"}
        severity={rowData.alreadySelected ? "success" : "warning"}
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
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "10px",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <DropdownFilter
          data={states}
          placeholder="Select a State"
          selected={selectedState}
          setSelected={setSelectedState}
        />
        <DropdownFilter
          data={seatTypes}
          placeholder="Select Seat Type"
          selected={selectedSeatType}
          setSelected={setSelectedSeatType}
        />
        <Button
          label="Apply Filter"
          className="p-button-raised"
          onClick={handleapplyfilter}
        />
      </div>
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
        globalFilterFields={["state", "name", "seatType", "reservedCategory"]}
        globalFilter={globalFilterValue}
        sortField="state"
        sortOrder={-1}
        emptyMessage="No Available Seat Found."
      >
        <Column
          sortable
          field="name"
          header="Name"
          style={{
            maxWidth: "150px",
          }}
        ></Column>
        <Column
          sortable
          field="state"
          header="State"
          style={{
            maxWidth: "150px",
          }}
        ></Column>
        <Column sortable field="seatType" header="Seat Type"></Column>
        <Column sortable field="reservedCategory" header="Category"></Column>
        <Column
          sortable
          body={selectedTemplate}
          header="Seat Selected"
        ></Column>
        <Column body={seatActionBodyTemplate} header="Seat Action"></Column>
        <Column sortable body={statusBodyTemplate} header="Status"></Column>
        <Column body={actionBodyTemplate} header="Info"></Column>
      </DataTable>
    </div>
  );
};

export default AvailableTable;
