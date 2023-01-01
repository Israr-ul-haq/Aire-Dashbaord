import moment from "moment";

export const columnNames = [
  {
    customerName: "",
    technicianName: "",
    serviceType: "",
    createdOn: "",
    totalAmount: "",
  },
];

export const pdfHeaders = [
  "Customer Name",
  "Technician Name",
  "Service Type",
  "Date",
  "Total Amount",
];

export const columns = (data, service, setLoader) => {
  return [
    {
      name: "Sr#",
      cell: (row, index) => {
        if (index < 9) {
          return "0" + (index + 1);
        } else {
          return index + 1;
        }
      },
      sortable: true,
      width: "150px",
      maxWidth: "150px",
    },

    {
      name: "Customer Name",
      cell: (row) => row["customerName"],
      sortable: true,
    },

    {
      name: "Technician Name",
      cell: (row) => row["technicianName"],
      sortable: true,
    },

    {
      name: "Date",
      cell: (row) => moment(row["createdOn"]).format("L"),
      sortable: true,
    },
    {
      name: "Service Type",
      cell: (row) => (
        <div>
          {row.serviceType === "Maintenance" ? (
            <div className="status_box status_main">
              <p className="status_text status_main_text">Maintenance</p>
            </div>
          ) : (
            <div className="status_offline_box status_Diag">
              <p className="status_offline_text status_dia_text">Diagnostics</p>
            </div>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Total Amount",
      cell: (row) => "$" + row["totalAmount"],
      sortable: true,
    },

    // {
    //   name: "Actions",
    //   button: true,
    //   cell: (row) => (
    //     <div>
    //       <div className="table_actions">
    //         <img src="/assets/images/Delete.svg" alt="" />
    //       </div>
    //     </div>
    //   ),
    // },
  ];
};
