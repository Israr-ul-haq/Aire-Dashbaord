import { Link } from "react-router-dom";
import deleteItem from "../components/deleteItem";

export const columnNames = [
  {
    type: "",
    price: "",
  },
];

export const pdfHeaders = ["type", "price"];

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
      name: "Service Type",
      cell: (row) => row["type"],
      sortable: true,
    },
    {
      name: "Price",
      cell: (row) => "$" + row["price"],
      sortable: true,
    },
    // {
    //   name: "Service Category",
    //   cell: (row) => (
    //     <div>
    //       {row.type === "Maintenance" ? (
    //         <div className="status_box status_main">
    //           <p className="status_text status_main_text">Maintenance</p>
    //         </div>
    //       ) : (
    //         <div className="status_offline_box status_Diag">
    //           <p className="status_offline_text status_dia_text">Diagnostics</p>
    //         </div>
    //       )}
    //     </div>
    //   ),
    //   sortable: true,
    // },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
          <div className="table_actions">
            {/* <Link to={`/services/view/${row.id}`}>
              <img src="/assets/images/View (1).svg" alt="" />
            </Link> */}
            <Link to={`/services/edit/${row.id}`}>
              <img src="/assets/images/Icon awesome-edit.svg" alt="" />
            </Link>
            {/* <img
              src="/assets/images/Delete.svg"
              alt=""
              onClick={() =>
                deleteItem(row.id, data, service, row.type, setLoader)
              }
            /> */}
          </div>
        </div>
      ),
      width: "250px",
      maxWidth: "250px",
    },
  ];
};
