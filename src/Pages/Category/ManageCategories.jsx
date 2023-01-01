import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import PageTitle from "../../components/PageTitle";
import { deleteSomething, get } from "../../Services/CategoryService";

import { columns, pdfHeaders, columnNames } from "../../tabledata/CategoryData";
export default function ManageCategories() {
  const [data, setData] = useState([]);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.title, elt.description];
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
  }, [loader]);

  const getData = async (page) => {
    setLoading(true);
    debugger;
    const response = await get();
    setData(response.data.data.categories);
    filterPdfData(response.data.data.categories);
    setLoading(false);
  };
  //   const handlePageChange = (page) => {
  //     getData(page);
  //   };

  //   const handlePerRowsChange = async (newPerPage, page) => {
  //     setLoading(true);
  //     const response = await get({ pageSize: newPerPage, pageNumber: page });
  //     setData(response.data.data.costomers);
  //     filterPdfData(response.data.data.costomers);
  //     setPerPage(newPerPage);
  //     setLoading(false);
  //   };
  //   const searchInput = async (search) => {
  //     debugger;

  //     const response = await get({
  //       pageNumber: 1,
  //       pageSize: 10,
  //       search: search,
  //     });
  //     setData(response.data.data.costomers);
  //     setTotalRows(response.data.data.total);
  //   };

  return (
    <div>
      <PageTitle title={"Users"} location={window.location.href} />
      <div className="main_heading">
        <div className="main_heading_flex">
          <h1 className="heading_text">Manage Category</h1>
          <Link to="/category/add">
            <button className="add_button">Add</button>
          </Link>
        </div>
      </div>
      <div className="header_main_section">
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          incomingData={data}
          inComingName={"Categories"}
          title={"Category Lists"}
          //   search={searchInput}
        />
        <Datatable
          columns={columns(data, deleteSomething, setLoader)}
          //   totalRows={totalRows}
          //   handlePerRowsChange={handlePerRowsChange}
          //   handlePageChange={handlePageChange}
          incomingData={data}
          customStyles={customStyles}
          loading={loading}
        />
      </div>
    </div>
  );
}
