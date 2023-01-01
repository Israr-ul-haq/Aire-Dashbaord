import React, { useEffect, useState } from "react";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import PageTitle from "../../components/PageTitle";
import { get } from "../../Services/QueriesService";
import { columns } from "../../tabledata/QueriesData";
import { pdfHeaders, columnNames } from "../../tabledata/QueriesData";

export default function ManageQueries() {
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.userFullName, elt.subject, elt.message, elt.status];
    });
    setFilteredPdfData(filteredData);
  };

  useEffect(() => {
    getData();
  }, [loader]);

  const getData = async () => {
    setLoading(true);
    const response = await get();
    debugger;
    setData(response.data.data.queries);
    filterPdfData(response.data.data.queries);

    setLoading(false);
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
      <PageTitle title={"Queries"} location={window.location.href} />
      <div className="main_heading">
        <div className="main_heading_flex">
          <h1 className="heading_text">Queries</h1>
        </div>
      </div>
      <div className="header_main_section">
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          incomingData={data}
          inComingName={"Queries"}
          title={"Queries Lists"}
        />
        <Datatable
          columns={columns(data)}
          // totalRows={totalRows}
          // handlePerRowsChange={handlePerRowsChange}
          // handlePageChange={handlePageChange}
          incomingData={data}
          customStyles={customStyles}
          // loading={loading}
        />
      </div>
    </div>
  );
}
