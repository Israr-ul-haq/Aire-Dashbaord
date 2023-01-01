import { useForm } from "react-hook-form";
import downloadCSV from "../helpers/ExportCSV";
import { exportPDF } from "../helpers/ExportPDF";

function DataTableHeader({
  incomingFilteredData,
  incomingData,
  inComingName,
  columnNames,
  pdfHeaders,
  title,
  search,
}) {
  function importfile(event) {
    debugger;
    if (event.target.value === "pdf") {
      exportPDF(pdfHeaders, incomingFilteredData, inComingName);
    } else {
      debugger;
      downloadCSV(incomingData, columnNames, inComingName);
    }
  }
  return (
    <>
      <div className="dataTable_header">
        <h4 className="dataTable_header_text">{title}</h4>
        <div className="dropdown_container">
          <select
            name=""
            id="file"
            className="table_export_btn"
            onChange={(e) => importfile(e)}
          >
            <option selected>Export</option>
            <option value="pdf">pdf</option>
            <option value="csv">csv</option>
          </select>
          {/* <button className="table_export_btn table_filter_btn">Filter</button> */}
          <input
            className="search_input"
            placeholder="Search"
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default DataTableHeader;
