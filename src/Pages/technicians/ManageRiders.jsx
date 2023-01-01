import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import PageTitle from "../../components/PageTitle";
import { deleteSomething, get } from "../../Services/TechnicianService";
import { columns } from "../../tabledata/RidersData";
import { pdfHeaders, columnNames } from "../../tabledata/RidersData";
export default function ManageRiders() {
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [filteredCsvData, setFilteredCsvData] = useState([]);

  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.firstName + elt.middleName + elt.lastName,
        elt.email,
        elt.phoneNumber,
        elt.isOnline,
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
  }, []);

  const getData = async (page) => {
    setLoading(true);
    debugger;
    const response = await get({
      pageNumber: page,
      pageSize: perPage,
      search: "",
    });
    setData(response.data.data.technicians);
    setTotalRows(response.data.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageNumber: page, pageSize: newPerPage });
    setData(response.data.data.technicians);

    setPerPage(newPerPage);
    setLoading(false);
  };
  const getPdfData = async () => {
    const response = await get({
      pageSize: 0,
      pageNumber: 0,
      search: "",
    });
    filterPdfData(response.data.data.technicians);
    setFilteredCsvData(response.data.data.technicians);
  };

  const searchInput = async (search) => {
    debugger;
    setLoader(true);
    const response = await get({
      pageNumber: 1,
      pageSize: 10,
      search: search,
    });
    setData(response.data.data.technicians);
    setTotalRows(response.data.data.total);
    setLoader(false);
  };

  return (
    <div>
      <PageTitle title={"Technician"} location={window.location.href} />
      <div className="main_heading">
        <div className="main_heading_flex">
          <h1 className="heading_text">Manage Technicians</h1>
          <div className="btn_container">
            <Link to="/riders/add">
              <button className="add_button">Add</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="header_main_section">
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          incomingData={data}
          inComingName={"Technicians"}
          title={"Technician List"}
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
