import React, { useEffect, useState } from "react";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import PageTitle from "../../components/PageTitle";
import { get } from "../../Services/PaymentService";
import { columns } from "../../tabledata/PaymentData";
import { pdfHeaders, columnNames } from "../../tabledata/PaymentData";

export default function ManagePayment() {
  const [data, setData] = useState([]);
  const [revenueData, setRevenueData] = useState();
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
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
  }, [loader]);

  const getPdfData = async () => {
    const response = await get({
      pageSize: 0,
      pageNumber: 0,
      search: "",
    });
    filterPdfData(response.data.data.paymentHistory);
    setFilteredCsvData(response.data.data.paymentHistory);
  };
  const getData = async (page) => {
    debugger;
    setLoading(true);
    const response = await get({
      pageSize: perPage,
      pageNumber: page,
      search: "",
    });
    debugger;
    setRevenueData(response.data.data);
    setData(response.data.data.paymentHistory);
    setTotalRows(response.data.data.total);
    setLoading(false);
  };
  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.paymentHistory);

    setPerPage(newPerPage);
    setLoading(false);
  };
  const searchInput = async (search) => {
    const response = await get({
      pageNumber: 1,
      pageSize: 10,
      search: search,
    });
    setData(response.data.data.paymentHistory);
    setTotalRows(response.data.data.total);
  };
  return (
    <div>
      <PageTitle title={"Payments"} location={window.location.href} />
      <div className="main_heading">
        <div className="main_heading_flex">
          <h1 className="heading_text">Payments</h1>
        </div>
      </div>
      <div className="revenue_box">
        <div className="revenue_inner_box">
          <h4 className="revenue_text">Total Revenue</h4>
          <h5 className="revenue_number">${revenueData?.revenue}</h5>
        </div>
      </div>
      <div className="header_main_section">
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          inComingName={"Payments"}
          incomingData={filteredCsvData}
          title={"Payment Lists"}
          search={searchInput}
        />
        <Datatable
          columns={columns(data)}
          totalRows={totalRows}
          handlePerRowsChange={handlePerRowsChange}
          handlePageChange={handlePageChange}
          incomingData={data}
          customStyles={customStyles}
          // loading={loading}
        />
      </div>
    </div>
  );
}
