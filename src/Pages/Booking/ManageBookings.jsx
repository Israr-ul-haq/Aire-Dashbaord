import React, { useEffect, useState } from "react";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import PageTitle from "../../components/PageTitle";
import { deleteSomething, get } from "../../Services/BookingService";
import { columns } from "../../tabledata/BookingData";
import { pdfHeaders, columnNames } from "../../tabledata/BookingData";

export default function ManageBooking() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [filteredCsvData, setFilteredCsvData] = useState([]);
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.customerName,
        elt.technicianName,
        elt.serviceType,
        elt.createdOn,
        elt.totalAmount,
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
  const getPdfData = async () => {
    const response = await get({
      pageSize: 0,
      pageNumber: 0,
      search: "",
    });
    debugger;
    filterPdfData(response.data.data.orders);
    setFilteredCsvData(response.data.data.orders);
  };

  const getData = async (page) => {
    setLoading(true);
    debugger;
    const response = await get({
      pageSize: perPage,
      pageNumber: page,
      search: "",
    });
    setData(response.data.data.orders);
    console.log(response.data.data.orders);
    setTotalRows(response.data.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.orders);
    setPerPage(newPerPage);
    setLoading(false);
  };
  const searchInput = async (search) => {
    const response = await get({
      pageNumber: 1,
      pageSize: 10,
      search: search,
    });
    setData(response.data.data.orders);
    setTotalRows(response.data.data.orders);
  };
  return (
    <div>
      <PageTitle title={"Booking"} location={window.location.href} />
      <div className="main_heading">
        <div className="main_heading_flex">
          <h1 className="heading_text">Booking</h1>
          {/* <div className="btn_container">
            <button className="add_button">Add</button>
          </div> */}
        </div>
      </div>
      <div className="header_main_section">
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          incomingData={filteredCsvData}
          inComingName={"Bookings"}
          title={"Booking Detail"}
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
