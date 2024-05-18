import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useFetchUserbySearch } from "../../services/UserServices";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

const SearchEmployeeTable = ({ outersearch }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perpage, setPerpage] = useState(19);
  const [total, setTotal] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  } = useFetchUserbySearch(outersearch);

  useEffect(() => {
    if (data) {
      setProducts(data.pages.map((page) => page.data.users.data).flat());
      setTotal(data.pages[0].data.users.total);
      setPerpage(data.pages[0].data.users.per_page - 1);
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
      </div>
    );
  };

  const onViewClick = (rowData) => {
    navigate(`/user-management/${rowData.id}`);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        label="View"
        severity="info"
        onClick={() => onViewClick(rowData)}
        style={{
          padding: "0.25rem 0.5rem",
        }}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={rowData.status === "ACTIVE" ? "success" : "danger"}
      ></Tag>
    );
  };

  const verifyBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.is_verified == "1" ? "VERIFIED" : "NOT VERIFIED"}
        severity={rowData.is_verified == "1" ? "success" : "danger"}
      ></Tag>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={products}
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
        totalRecords={total}
        loading={isFetching || isPending}
        header={header}
        globalFilterFields={[
          "name",
          "email",
          "mobile_number",
          "city",
          "dob",
          "id",
          "status",
        ]}
        globalFilter={globalFilterValue}
        emptyMessage="No users found."
      >
        <Column field="id" header="User Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="mobile_number" header="Mobile Number"></Column>
        <Column field="city" header="Address"></Column>
        <Column field="dob" header="DOB"></Column>
        <Column body={statusBodyTemplate} header="Status"></Column>
        <Column body={verifyBodyTemplate} header="Verification"></Column>
        <Column body={actionBodyTemplate} header="View"></Column>
      </DataTable>
    </div>
  );
};

export default SearchEmployeeTable;
