import { Link } from "react-router-dom";

export const columnNames = [
  {
    userFullName: "",
    subject: "",
    message: "",
    status: "",
  },
];

export const pdfHeaders = ["userFullName", "subject", "message", "status"];

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
      cell: (row) => row["userFullName"],
      sortable: true,
      width: "250px",
      maxWidth: "250px",
    },
    {
      name: "Subject",
      cell: (row) => row["subject"],
      sortable: true,
      width: "250px",
      maxWidth: "250px",
    },
    {
      name: "Message",
      cell: (row) => row["message"],
      sortable: true,
      width: "250px",
      maxWidth: "250px",
    },

    {
      name: "Status",
      cell: (row) =>
        row.status ? (
          <div style={{ color: "green" }}>Resolved</div>
        ) : (
          <div style={{ color: "red" }}>Pending</div>
        ),

      sortable: true,
      width: "500px",
      maxWidth: "500px",
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
          <div className="table_actions">
            <Link to={`/queries/view/${row?.customerQueryId}/${row?.status}`}>
              <img src={`/assets/images/View (1).svg`} alt="" />
            </Link>
          </div>
        </div>
      ),
    },
  ];
};
