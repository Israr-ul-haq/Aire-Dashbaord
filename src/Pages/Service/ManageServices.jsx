import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import PageTitle from "../../components/PageTitle";
import { get } from "../../Services/MService.js";
import { deleteSomething } from "../../Services/TechnicianService";
import { columns } from "../../tabledata/ServiceData";
import { pdfHeaders, columnNames } from "../../tabledata/UsersData";

export default function ManageServices() {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.type, elt.price];
    });
    setFilteredPdfData(filteredData);
  };

  useEffect(() => {
    getData(1);
  }, [loader]);

  const getData = async (page) => {
    setLoading(true);
    const response = await get({ pageSize: 100, pageNumber: 1 });
    setData(response.data.data.services);
    filterPdfData(response.data.data.services);
    setLoading(false);
    setLoader(true);
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
  return (
    <div>
      <PageTitle title={"services"} location={window.location.href} />
      <div className="main_heading">
        <div className="main_heading_flex">
          <h1 className="heading_text">Manage Services</h1>
          {/* <div className="btn_container">
            <Link to="/services/add">
              <button className="add_button">Add</button>
            </Link>
          </div> */}
        </div>
      </div>
      <div className="header_main_section">
        <div className="dataTable_header">
          <h4 className="dataTable_header_text">Services List</h4>
        </div>
        <Datatable
          columns={columns(data, deleteSomething, setLoader)}
          incomingData={data}
          customStyles={customStyles}
          loading={loading}
        />
      </div>
    </div>
  );
}
