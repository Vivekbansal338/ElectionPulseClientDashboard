import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import DropdownFilter from "./DropDownFilter";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useRemoveSeat } from "../../Hooks/Query/ElectionSeatQuery";
import { Dialog } from "primereact/dialog";
import { useParams } from "react-router-dom";
import { useGetSelectedSeatsByElectionId } from "../../Hooks/Query/ElectionSeatQuery";
import AvailableParties from "./AvailableParties";
import AvailableEmployees from "./AvailableEmployees";
import { Badge } from "primereact/badge";
const seatTypes = [{ name: "Lok Sabha" }, { name: "Vidhan Sabha" }];
const states = [
  { name: "All States" },
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

const SelectedTable = ({ setEmployeeDialog, showSelected = true }) => {
  const { id: electionId } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { mutate: removeSeat, isPending: isRemoveSeatPending } =
    useRemoveSeat();
  const [perpage, setPerpage] = useState(0);
  const [totalpages, setTotalPages] = useState(0);
  const [addpartydialog, setAddpartydialog] = useState({
    show: false,
    data: null,
    type: null,
  });
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [selectedState, setSelectedState] = useState({
    name: "All States",
  });
  const [selectedSeatType, setSelectedSeatType] = useState({
    name: "Lok Sabha",
  });
  const [searchfiltervalue, setSearchfiltervalue] = useState({
    state: "All States",
    seattype: "Lok Sabha",
  });

  const {
    data,
    isPending: isLoading,
    isError: SelectedisError,
    error: Selectederror,
  } = useGetSelectedSeatsByElectionId(
    showSelected,
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
      setTotalPages(10);
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
        <span className="text-xl text-900 font-bold">Selected Seats</span>
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
    console.log("rowData", rowData);
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
  const removeseat = (id) => {
    const formdata = {
      id: id,
    };
    removeSeat(
      {
        data: formdata,
      },
      {
        onSuccess: (data) => {
          if (data.success === false) return;
          setProducts((prevProducts) =>
            prevProducts.filter(
              (product) => product.electionSeatId !== formdata.id
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

  const handleSelectSeat = (rowData) => {
    removeseat(rowData.electionSeatId);
  };

  const seatActionBodyTemplate = (rowData) => {
    return (
      <Button
        label="Remove Seat"
        severity="danger"
        loading={isRemoveSeatPending}
        disabled={isRemoveSeatPending}
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
        severity={rowData.status === "Active" ? "success" : "warning"}
      ></Tag>
    );
  };

  const employeeBodyTemplate = (rowData) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Badge
          value={rowData.employeeCount}
          severity={rowData.employeeCount > 0 ? "success" : "danger"}
        />

        <Button
          label="+/- Employee"
          rounded
          severity="secondary"
          outlined
          size="small"
          onClick={() =>
            setAddpartydialog({
              show: true,
              data: rowData,
              type: "employee",
            })
          }
          aria-label="Add/Remove Employee"
        />
      </div>
    );
  };
  const partyBodyTemplate = (rowData) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Badge
          value={rowData.partyCount}
          severity={rowData.partyCount > 1 ? "success" : "danger"}
        />

        <Button
          label="+/- Party"
          rounded
          severity="secondary"
          outlined
          size="small"
          onClick={() =>
            setAddpartydialog({
              show: true,
              data: rowData,
              type: "party",
            })
          }
          aria-label="Add/Remove Party"
        />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div
      className="card"
      // style={{
      //   width: "100%",
      //   boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      //   borderRadius: "15px",
      //   padding: "15px",
      //   backgroundColor: "white",
      // }}
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
        emptyMessage="No Selected Seat found."
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
          sortFunction={(a, b) => a.partyCount - b.partyCount}
          body={partyBodyTemplate}
          header="Total Parties"
        ></Column>
        <Column
          sortable
          sortFunction={(a, b) => a.employeeCount - b.employeeCount}
          body={employeeBodyTemplate}
          header="Total Employees"
        ></Column>
        <Column body={seatActionBodyTemplate} header="Seat Action"></Column>
        <Column
          sortable
          style={{
            maxWidth: "80px",
          }}
          body={statusBodyTemplate}
          header="Seat Status"
        ></Column>
        <Column body={actionBodyTemplate} header="Info"></Column>
      </DataTable>

      <div className="card">
        <Dialog
          visible={addpartydialog.show}
          style={{ width: "100%", height: "100%" }}
          maximizable
          modal
          onHide={() =>
            setAddpartydialog({
              show: false,
              data: null,
              type: null,
            })
          }
          headerStyle={{
            padding: "5px",
          }}
        >
          {addpartydialog.data && addpartydialog.type == "party" && (
            <AvailableParties
              showParties={
                addpartydialog.show && addpartydialog.type == "party"
              }
              seatData={addpartydialog.data}
            />
          )}
          {addpartydialog.data && addpartydialog.type == "employee" && (
            <AvailableEmployees
              showEmployees={
                addpartydialog.show && addpartydialog.type == "employee"
              }
              seatData={addpartydialog.data}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default SelectedTable;
