import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useGetEmployees } from "../../Hooks/Query/EmployeeQuery";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

const AllEmployeesTable = ({ setEmployeeDialog }) => {
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
    isError,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetEmployees();

  useEffect(() => {
    if (data) {
      setProducts(data.pages.map((page) => page.data).flat());
      setTotalPages(data.pages[0].totalPages);
      setPerpage(data.pages[0].limit - 1);
    }
  }, [data]);

  const onPageChange = (event) => {
    const currentPageNumber = event.first / event.rows;
    setCurrentPage(currentPageNumber);
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      event.page + 1 === event.pageCount
    ) {
      fetchNextPage();
    }
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
      <div className="flex justify-content-end">
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
    );
  };

  const onViewClick = (rowData) => {
    setEmployeeDialog({
      visible: true,
      data: rowData,
    });
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
          rowData.verificationStatus == "Verified" ? "success" : "danger"
        }
      ></Tag>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.profileImage}
        alt={rowData.name}
        className="image"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
        }}
      />
    );
  };

  const mobileNumberBodyTemplate = (rowData) => {
    const number = rowData.mobileNumber === "" ? "N/A" : rowData.mobileNumber;
    return <span>{number}</span>;
  };

  const header = renderHeader();

  return (
    <div className="card">
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
        loading={isPending || isFetching}
        header={header}
        globalFilterFields={["email", "name"]}
        globalFilter={globalFilterValue}
        emptyMessage="No Employee found."
      >
        <Column body={imageBodyTemplate} header="Profile Image"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="role" header="Role"></Column>
        <Column field={mobileNumberBodyTemplate} header="Mobile"></Column>
        <Column body={statusBodyTemplate} header="Status"></Column>
        <Column body={verifyBodyTemplate} header="Verification"></Column>
        <Column body={actionBodyTemplate} header="Info"></Column>
      </DataTable>
    </div>
  );
};

export default AllEmployeesTable;
