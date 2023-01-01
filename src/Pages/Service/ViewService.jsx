import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../constants/Loader.jsx";
import { getById } from "../../Services/MService.js";

export default function ViewService() {
  const [data, setData] = useState();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      debugger;
      const response = await getById(id);
      setData(response.data.data.service);
    })();
  }, [Loader]); //eslint-disable-line
  return (
    <div>
      <div>
        <div className="main_heading">
          <div className="main_heading_flex">
            <Link to="/users" className="NavLink">
              <div className="arrow_back">
                <img src="/assets/images/backArrow.svg" alt="" />
                <h1 className="heading_text">Service Information</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="header_main_section">
          <div className="row" style={{ paddingBottom: "40px" }}>
            <div className="col-md-4">
              <div className="layout_padding_section">
                <p className="layout_heading_primary">Service Name</p>
                <p className="layout_secondary_heading">{data?.type}</p>
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className="layout_padding_section">
                <p className="layout_heading_primary">Service Type</p>
                <p className="layout_secondary_heading">Maintenance</p>
              </div>
            </div> */}
            <div className="col-md-4">
              <div className="layout_padding_section">
                <p className="layout_heading_primary">Price</p>
                <p className="layout_secondary_heading">$100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
