import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Datatable from "../../components/Datatable";
import Loader from "../../constants/Loader";
import { getById, getReviews } from "../../Services/BookingService";
import { getById as getTech } from "../../Services/TechnicianService";
import { getById as getUser } from "../../Services/UsersService";
import { columns } from "../../tabledata/ServiceData";
import Ratings from "react-ratings-declarative";
export default function ViewBooking() {
  const [userData, setUserData] = useState();

  const [bookingData, setBookingData] = useState();
  const [techData, setTechData] = useState();
  const [reviewsData, setReviewsData] = useState();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      debugger;
      setLoader(true);
      const response = await getById(id);
      if (response.data.code === 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.data.message,
          showConfirmButton: true,
          timer: 5000,
        });
      }
      const response1 = await getTech(response.data.data.order.technicianId);
      if (response1.data.Code === 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Technician is not assigned",
          showConfirmButton: true,
          timer: 5000,
        });
        setLoader(false);
      }
      const response3 = await getUser(response.data.data.order.customerId);
      debugger;

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
      const response2 = await getReviews(id);
      setUserData(response3.data.data.user);
      setReviewsData(response2.data.data.review);
      setTechData(response1.data.data.user);
      setBookingData(response.data.data.order);
      setLoader(false);
    })();
  }, []); //eslint-disable-line

  return (
    <div>
      <div>
        <div className="main_heading">
          <div className="main_heading_flex">
            <Link to="/bookings" className="NavLink">
              <div className="arrow_back">
                <img src="/assets/images/backArrow.svg" alt="" />
                <h1 className="heading_text">Booking</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="header_main_section">
          <div className="section_primary_heading">
            <h4 className="rider_main_heading vehicle_heading">User Details</h4>
          </div>
          {loader ? (
            Loader
          ) : (
            <>
              <div className="view_layout_primary_header">
                <div className="layout_flex">
                  <img
                    src={
                      bookingData?.customerProfilePicPath
                        ? bookingData?.customerProfilePicPath
                        : "/assets/images/Profile_photo.png"
                    }
                    className="profile_pic_size"
                    alt=""
                  />
                  <div>
                    <p className="layout_heading_primary">Full Name</p>
                    <p className="layout_secondary_heading">
                      {userData?.firstName +
                        " " +
                        userData?.middleName +
                        " " +
                        userData?.lastName}
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
                    <p className="layout_secondary_heading">
                      {userData?.email}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">PHONE NUMBER</p>
                    <p className="layout_secondary_heading">
                      {userData?.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">Address</p>
                    <p className="layout_secondary_heading">
                      {" "}
                      {userData?.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="section_primary_heading">
                <h4 className="rider_main_heading vehicle_heading">
                  Technician Details
                </h4>
              </div>
              <div className="view_layout_primary_header">
                <div className="layout_flex">
                  <img
                    src={
                      techData?.profilePicPath
                        ? techData?.profilePicPath
                        : "/assets/images/Profile_photo.png"
                    }
                    className="profile_pic_size"
                    alt=""
                  />
                  <div>
                    <p className="layout_heading_primary">Full Name</p>
                    <p className="layout_secondary_heading">
                      {techData?.firstName +
                        " " +
                        techData?.middleName +
                        " " +
                        techData?.lastName}
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
                    <p className="layout_secondary_heading">
                      {techData?.email}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">PHONE NUMBER</p>
                    <p className="layout_secondary_heading">
                      {techData?.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">Rating</p>
                    <p className="layout_secondary_heading">
                      {reviewsData?.points ? reviewsData?.points : "0"}
                      <Ratings
                        rating={reviewsData?.points}
                        widgetRatedColors="#FFC107"
                        widgetDimensions="18px"
                        widgetSpacings="5px"
                      >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                      </Ratings>
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">Date</p>
                    <p className="layout_secondary_heading">
                      {" "}
                      {moment(bookingData?.createdOn).format("L")}
                    </p>
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
                      {techData?.vehicalInformation.name}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">MAKE</p>
                    <p className="layout_secondary_heading">
                      {techData?.vehicalInformation.make}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="layout_padding_section">
                    <p className="layout_heading_primary">MODEL</p>
                    <p className="layout_secondary_heading">
                      {techData?.vehicalInformation.model}
                    </p>
                  </div>
                </div>
              </div>
              <div className="section_main_heading">
                <h4 className="rider_main_heading vehicle_heading">
                  Service Details
                </h4>
              </div>
              <div className="">
                <div className="border_bottom_item"></div>
              </div>
              <div className="row">
                <div className="col-md-4 ">
                  <div className="border_right_booking">
                    <div className="section_booking_section ">
                      <div>
                        <div className="view_booking_heading">
                          <h5>Service Type</h5>
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                          {bookingData?.serviceType.trim() === "Maintenance" ? (
                            <div className="status_box status_main">
                              <p className="status_text status_main_text">
                                Maintenance
                              </p>
                            </div>
                          ) : (
                            <div className="status_offline_box status_Diag">
                              <p className="status_offline_text status_dia_text">
                                Diagnostics
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 border_right_booking">
                  <div className="section_booking_section ">
                    <div>
                      <div className="view_booking_heading">
                        <h5>Items</h5>
                      </div>
                      <div style={{ paddingTop: "10px" }}>
                        <p className="layout_heading_primary">
                          {bookingData?.serviceItemCount + "  "}
                          Items
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="section_booking_section ">
                    <div>
                      <div className="view_booking_heading">
                        <h5>Payment</h5>
                        <div style={{ paddingTop: "10px" }}>
                          <p className="layout_heading_primary">
                            {"$" + bookingData?.totalAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <Datatable
                columns={columns(data)}
                // totalRows={totalRows}
                // handlePerRowsChange={handlePerRowsChange}
                // handlePageChange={handlePageChange}
                incomingData={data}
                customStyles={customStyles}
                // loading={loading}
              /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
