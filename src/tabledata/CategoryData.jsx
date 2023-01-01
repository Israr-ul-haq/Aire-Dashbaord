import { Link } from "react-router-dom";
import deleteItem from "../components/deleteItem";

export const columnNames = [
  {
    title: "",
    description: "",
  },
];

export const pdfHeaders = ["Category Name", "Description"];

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
      name: "Category Name",
      cell: (row) => row.title,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
          <div className="table_actions">
            <Link to={`/category/edit/${row.id}`}>
              <img src="/assets/images/Icon awesome-edit.svg" alt="" />
            </Link>
            <img
              src="/assets/images/Delete.svg"
              alt=""
              onClick={() =>
                deleteItem(row.id, data, service, row.title, setLoader)
              }
            />
          </div>
        </div>
      ),
      width: "200px",
      maxWidth: "200px",
    },
  ];
};
