import { Link } from "react-router-dom";
import deleteItem from "../components/deleteItem";

export const columnNames = [
  {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    accountStatus: "",
  },
];

export const pdfHeaders = ["Full Name", "Email", "Phone Number", "Status"];

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
      name: "Full Name",
      cell: (row) =>
        row["firstName"] + " " + row["middleName"] + " " + row["lastName"],
      sortable: true,
    },

    {
      name: "Email",
      cell: (row) => row["email"],
      sortable: true,
    },
    {
      name: "Phone Number",
      cell: (row) => row["phoneNumber"],
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <div>
          {row?.accountStatus === "Active" ? (
            <div className="status_box">
              <p className="status_text">Approved</p>
            </div>
          ) : row?.accountStatus === "Pending" ? (
            <div className="status_offline_box">
              <p className="status_offline_text">Pending</p>
            </div>
          ) : (
            ""
          )}
        </div>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
          <div className="table_actions">
            <Link to={`/riders/view/${row.id}/${row.accountStatus}`}>
              <img src="/assets/images/View (1).svg" alt="" />
            </Link>
            <Link to={`/riders/edit/${row.id}`}>
              <img src="/assets/images/Icon awesome-edit.svg" alt="" />
            </Link>
            <img
              src="/assets/images/Delete.svg"
              alt=""
              onClick={() =>
                deleteItem(
                  row.id,
                  data,
                  service,
                  row.firstName + " " + row.middleName + " " + row.lastName,
                  setLoader
                )
              }
            />
          </div>
        </div>
      ),
      width: "250px",
      maxWidth: "250px",
    },
  ];
};
