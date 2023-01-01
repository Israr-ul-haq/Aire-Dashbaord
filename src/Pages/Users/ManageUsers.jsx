import React, { useEffect, useState } from "react";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import PageTitle from "../../components/PageTitle";
import { deleteSomething, get } from "../../Services/UsersService";

import { columns, pdfHeaders, columnNames } from "../../tabledata/UsersData";
export default function ManageUsers() {
  const [data, setData] = useState([]);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [filteredCsvData, setFilteredCsvData] = useState([]);
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.firstName + elt.middleName + elt.lastName,
        elt.email,
        elt.phoneNumber,
        elt.accountStatus,
      ];
    });
    setFilteredPdfData(filteredData);
  };

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "#00000014",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#00000014",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#00000014",
        },
      },
    },
  };

  useEffect(() => {
    getData(1);
    getPdfData();
  }, [loader]);

  const getData = async (page) => {
    setLoading(true);
    const response = await get({
      pageSize: perPage,
      pageNumber: page,
      search: "",
    });
    debugger;
    setData(response.data.data.costomers);

    setTotalRows(response.data.data.total);
    setLoading(false);
  };
  const getPdfData = async () => {
    const response = await get({
      pageSize: 0,
      pageNumber: 0,
      search: "",
    });

    filterPdfData(response.data.data.costomers);
    setFilteredCsvData(response.data.data.costomers);
  };
  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.costomers);

    setPerPage(newPerPage);
    setLoading(false);
  };
  const searchInput = async (search) => {
    debugger;
    const response = await get({
      pageNumber: 1,
      pageSize: 10,
      search: search,
    });
    setData(response.data.data.costomers);
    setTotalRows(response.data.data.total);
  };

  return (
    <div>
      <PageTitle title={"Users"} location={window.location.href} />
      <div className="main_heading">
        <div className="main_heading_flex">
          <h1 className="heading_text">Manage Users</h1>
          <div className="btn_container">
            {/* <button className="add_button">Add</button> */}
          </div>
        </div>
      </div>
      <div className="header_main_section">
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          incomingData={data}
          inComingName={"Users"}
          title={"Users List"}
          search={searchInput}
        />
        <Datatable
          columns={columns(data, deleteSomething, setLoader)}
          totalRows={totalRows}
          handlePerRowsChange={handlePerRowsChange}
          handlePageChange={handlePageChange}
          incomingData={data}
          customStyles={customStyles}
          loading={loading}
        />
      </div>
    </div>
  );
}
