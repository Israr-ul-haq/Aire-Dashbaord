import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../constants/Loader";
import { getById } from "../../Services/UsersService";

export default function ViewUser() {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await getById(id);
      setData(response.data.data.user);
      setLoader(false);
      if (response.data.code === 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.data.message,
          showConfirmButton: true,
          timer: 5000,
        });
      }
    })();
  }, []); //eslint-disable-line
  return (
    <div>
      <div>
        <div className="main_heading">
          <div className="main_heading_flex">
            <Link to="/users" className="NavLink">
              <div className="arrow_back">
                <img src="/assets/images/backArrow.svg" alt="" />
                <h1 className="heading_text">Customer Information</h1>
              </div>
            </Link>
          </div>
        </div>

        <div className="header_main_section">
          {loader ? (
            Loader
          ) : (
            <>
              <div className="view_layout_header">
                <div className="layout_flex">
                  <img
                    src={
                      data?.profilePicPath
                        ? data?.profilePicPath
                        : "/assets/images/Profile_photo.png"
                    }
                    className="profile_pic_size"
                    alt=""
                  />
                  <div>
                    <p className="layout_heading_primary">Full Name</p>
                    <p className="layout_secondary_heading">
                      {data?.firstName + data?.middleName + data?.lastName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border_contains">
                <div className="border_bottom_item"></div>
              </div>

              <div className="row" style={{ paddingBottom: "40px" }}>
                <div className="col-md-4">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">Email</p>
                    <p className="layout_secondary_heading">{data?.email}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">PHONE NUMBER</p>
                    <p className="layout_secondary_heading">
                      {data?.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">EVALUATION</p>
                    <p className="layout_secondary_heading">
                      4 years experience
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">ADDRESS</p>
                    <p className="layout_secondary_heading">{data?.address}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
