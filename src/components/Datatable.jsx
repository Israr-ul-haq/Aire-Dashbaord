import DataTable from "react-data-table-component";

function Datatable({
  incomingData,
  columns,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  customStyles,
}) {
  return (
    <div marginTop={"35px"}>
      <DataTable
        title=""
        columns={columns}
        data={incomingData}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        progressPending={loading}
        customStyles={customStyles}
      />
    </div>
  );
}

export default Datatable;
