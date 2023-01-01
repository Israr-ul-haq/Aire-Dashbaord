import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import PageTitle from "../../components/PageTitle";
import {
  deleteSomething,
  get,
  getByCategory,
} from "../../Services/ItemsService";
import { get as getCategory } from "../../Services/CategoryService";
import Loader from "../../constants/Loader";
import deleteItem from "../../components/deleteItem";

export default function ManageITems() {
  const [data, setData] = useState([]);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(0);
  const [itemsData, setItemsData] = useState([]);
  const [getDataCount, setDataCount] = useState(0);

  useEffect(() => {
    if (getDataCount === 0) {
      getCategories();
      getData(page);
      setDataCount(0);
    }
  }, []);

  const getData = async (page) => {
    setLoading(true);
    const response = await get({
      pageSize: perPage,
      pageNumber: page,
    });
    debugger;
    setData(response.data.data.products);
    setTotalRows(response.data.data.total);
    setFilteredPdfData(response.data.data.products);
    setLoading(false);
  };
  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
    setLoading(true);
    const response = await get({
      pageSize: perPage,
      pageNumber: newPage,
    });
    setData(response.data.data.products);
    setTotalRows(response.data.data.total);
    setFilteredPdfData(response.data.data.products);
    setLoading(false);
    setLoader(true);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.products);
    setFilteredPdfData(response.data.data.products);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const getCategories = async () => {
    setLoading(true);

    const response = await getCategory();
    setItemsData(response.data.data.categories);
    setLoading(false);
  };

  const Search = async (e) => {
    if (e.target.value === "all") {
      const response = await get({
        pageSize: perPage,
        pageNumber: page,
      });
      setData(response.data.data.products);
      setTotalRows(response.data.data.total);
      setFilteredPdfData(response.data.data.products);
    } else {
      const response = await getByCategory({
        pageSize: 10,
        pageNumber: 0,
        id: e.target.value,
      });
      setData(response.data.data.products);
      setTotalRows(response.data.data.total);
      setLoading(false);
    }
  };
  return (
    <div>
      <PageTitle title={"items"} location={window.location.href} />
      <div className="main_heading">
        <div className="main_heading_flex">
          <h1 className="heading_text">Manage Items</h1>
          <div className="btn_container">
            <Link to="/items/add">
              <button className="add_button">Add</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="header_main_section">
        <div className="dataTable_items">
          <h4 className="dataTable_header_text">Item Lists</h4>
          <select onChange={(e) => Search(e)} className="category_dropdown">
            <option selected value="all">
              All Category
            </option>
            {itemsData.map((item) => {
              return (
                <>
                  <option value={item.id}>{item.title}</option>
                </>
              );
            })}
          </select>
        </div>

        <div className="border_contains">
          <div className="border_bottom_item"></div>
        </div>
        <div className="box_container">
          {loading
            ? Loader
            : data?.map((item) => {
                return (
                  <>
                    <div className="items_box">
                      <div className="items_padding">
                        <img
                          src={
                            item?.imageURL
                              ? item?.imageURL
                              : "/assets/images/items_image.png"
                          }
                          className="items_image"
                          alt=""
                        />
                        <div className="items_parent_container">
                          <div className="item_text_box">
                            <h4 className="Item_name">{item?.title}</h4>
                            <h6 className="Item_price">{"$" + item?.price}</h6>
                          </div>
                          <div className="items_edit_box">
                            <Link
                              to={`/items/edit/${item.id}`}
                              style={{ paddingTop: "10px" }}
                            >
                              <img
                                src="/assets/images/Edit_item.svg"
                                style={{ paddingRight: "10px" }}
                                alt=""
                              />
                            </Link>
                            <img
                              style={{ width: "15px" }}
                              src="/assets/images/Delete.svg"
                              alt=""
                              onClick={() =>
                                deleteItem(
                                  item.id,
                                  data,
                                  deleteSomething,
                                  item?.title,
                                  setLoader
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
        </div>
        <div className="border_contains">
          <div className="border_bottom_item"></div>
        </div>
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={perPage}
          onRowsPerPageChange={handlePerRowsChange}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}
