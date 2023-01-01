import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../constants/Loader";
import { approveApi, getById } from "../../Services/TechnicianService";

export default function ViewRider() {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const { id, status } = useParams();
  useEffect(() => {
    (async () => {
      debugger;
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
  const navigate = useNavigate();
  const approve = async () => {
    const response = await approveApi(id);
    debugger;
    if (response.data.code === 1) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
      setTimeout(() => {
        navigate("/riders");
      }, 0);
    }
  };

  const viewImage1 = () => {
    Swal.fire({
      imageUrl: data.technicianDocument.license,
      imageWidth: "100%",
      imageHeight: "100%",
      showCancelButton: false,
      showConfirmButton: false,
      background: "none",
    });
  };
  const viewImage2 = () => {
    Swal.fire({
      imageUrl: data.technicianDocument.epaCertificate,
      imageWidth: "100%",
      imageHeight: "100%",
      showCancelButton: false,
      showConfirmButton: false,
      background: "none",
    });
  };

  return (
    <div>
      <div>
        <div className="main_heading">
          <div className="main_heading_flex">
            <Link to="/riders" className="NavLink">
              <div className="arrow_back">
                <img src="/assets/images/backArrow.svg" alt="" />
                <h1 className="heading_text">Technician Information</h1>
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
                      {data?.firstName +
                        " " +
                        data?.middleName +
                        " " +
                        data?.lastName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border_contains">
                <div className="border_bottom_item"></div>
              </div>

              <div className="row" style={{ paddingBottom: "40px" }}>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">Email</p>
                    <p className="layout_secondary_heading">{data?.email}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">PHONE NUMBER</p>
                    <p className="layout_secondary_heading">
                      {" "}
                      {data?.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">PASSWORD</p>
                    <p className="layout_secondary_heading">********</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">EXPERIENCE</p>
                    <p className="layout_secondary_heading">
                      {data?.experience.experienceYears} Year
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">Skill Level</p>
                    <p className="layout_secondary_heading">
                      {" "}
                      {data?.experience.skillLevel}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">Address</p>
                    <p className="layout_secondary_heading">{data?.address}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">COMPANY NAME</p>
                    <p className="layout_secondary_heading">
                      {data?.companyName}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">CAC#</p>
                    <p className="layout_secondary_heading">{data?.cac}</p>
                  </div>
                </div>
              </div>
              <div className="section_main_heading">
                <h4 className="rider_main_heading vehicle_heading">
                  Vehicle Information
                </h4>
              </div>
              <div className="border_contains">
                <div className="border_bottom_item"></div>
              </div>
              <div className="row" style={{ paddingBottom: "40px" }}>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">VEHCILE NAME</p>
                    <p className="layout_secondary_heading">
                      {data?.vehicalInformation.name}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">MAKE</p>
                    <p className="layout_secondary_heading">
                      {" "}
                      {data?.vehicalInformation.make}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">MODEL</p>
                    <p className="layout_secondary_heading">
                      {" "}
                      {data?.vehicalInformation.model}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">YEAR</p>
                    <p className="layout_secondary_heading">
                      {" "}
                      {data?.vehicalInformation.year}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">LICENSE PLATE</p>
                    <p className="layout_secondary_heading">
                      {data?.vehicalInformation.licensePlate}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">COLOR</p>
                    <p className="layout_secondary_heading">
                      {" "}
                      {data?.vehicalInformation.color}
                    </p>
                  </div>
                </div>
              </div>
              <div className="section_main_heading">
                <h4 className="rider_main_heading vehicle_heading">
                  Document Information
                </h4>
              </div>
              <div className="border_contains">
                <div className="border_bottom_item"></div>
              </div>

              <div className="popup_btn_section">
                <button className="certificate_btn" onClick={viewImage2}>
                  View EPA Cerficate
                </button>
                <button className="certificate_btn" onClick={viewImage1}>
                  View License Image
                </button>
              </div>
            </>
          )}
        </div>
        <div className="button_section">
          {status === "Pending" ? (
            <button className="save_button" onClick={approve}>
              {loader ? (
                <div class="btnloader1 button_loader">{Loader}</div>
              ) : (
                "Accept"
              )}
            </button>
          ) : (
            ""
          )}
          <Link to="/riders">
            <button className="cancel_button">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
