import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import deleteItem from "./deleteItem";
import Logoutpopup from "./LogoutPopup";

export default function SideBar() {
  const navigate = useNavigate();
  // const logout = (evt) => {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   localStorage.removeItem("AireUser");
  //   navigate("/account/login");
  // };
  return (
    <div className="Sidebar_section inner_sidebar">
      <div className="row section_row">
        <div className="col-md-12">
          <div className="background_section">
            <div className="Sidebar_constainer">
              <img
                src="/assets/images/Logo.png"
                alt="AirLogo"
                className="logo_img_size"
              />
            </div>
            <div className="border_bottom"></div>
            <NavLink to="/" className="NavLink">
              <div className="sidebar_icon_section sidebar_icon_padding_section ">
                <img
                  src="/assets/images/Dashboard (1).svg"
                  alt="AirLogo"
                  className="sidebar_icons inactivesidebarimage"
                />
                <img
                  src="/assets/images/DashboardActive.svg"
                  alt="AirLogo"
                  className="sidebar_icons activesidebarimage"
                />
                <h5 className="icon_text iconpadding">Dashboard</h5>
              </div>
            </NavLink>
            <div className="border_bottom align_right"></div>
            <NavLink to="users" className="NavLink">
              <div className="sidebar_icon_section sidebar_icon2_padding ">
                <img
                  src="/assets/images/User.svg"
                  alt="AirLogo"
                  className="sidebar_icons inactivesidebarimage"
                />
                <img
                  src="/assets/images/UsersActive.svg"
                  alt="AirLogo"
                  className="sidebar_icons activesidebarimage"
                />
                <h5 className="icon_text iconpadding">Manage Users</h5>
              </div>
            </NavLink>
            <NavLink to="riders" className="NavLink">
              <div className="sidebar_icon_section sidebar_icon2_padding ">
                <img
                  src="/assets/images/Technician.svg"
                  alt="AirLogo"
                  className="sidebar_icons inactivesidebarimage"
                />
                <img
                  src="/assets/images/TechnicianActive.svg"
                  alt="AirLogo"
                  className="sidebar_icons activesidebarimage "
                />
                <h5 className="icon_text iconpadding">Manage Technicians</h5>
              </div>
            </NavLink>
            <NavLink to="services" className="NavLink">
              <div className="sidebar_icon_section sidebar_icon2_padding ">
                <img
                  src="/assets/images/Service.svg"
                  alt="AirLogo"
                  className="sidebar_icons inactivesidebarimage"
                />
                <img
                  src="/assets/images/ServiceActive.svg"
                  alt="AirLogo"
                  className="sidebar_icons activesidebarimage"
                />
                <h5 className="icon_text iconpadding">Manage Services</h5>
              </div>
            </NavLink>
            <NavLink to="bookings" className="NavLink">
              <div className="sidebar_icon_section sidebar_icon2_padding ">
                <img
                  src="/assets/images/Bookings.svg"
                  alt="AirLogo"
                  className="sidebar_icons inactivesidebarimage"
                />
                <img
                  src="/assets/images/BookingsActive.svg"
                  alt="AirLogo"
                  className="sidebar_icons activesidebarimage"
                />
                <h5 className="icon_text iconpadding">Bookings</h5>
              </div>
            </NavLink>
            <NavLink to="items" className="NavLink">
              <div className="sidebar_icon_section sidebar_icon2_padding ">
                <img
                  src="/assets/images/Items.svg"
                  alt="AirLogo"
                  className="sidebar_icons inactivesidebarimage"
                />
                <img
                  src="/assets/images/ItemsActive.svg"
                  alt="AirLogo"
                  className="sidebar_icons activesidebarimage"
                />
                <h5 className="icon_text iconpadding">Manage Items</h5>
              </div>
            </NavLink>
            <NavLink to="category" className="NavLink">
              <div className="sidebar_icon_section sidebar_icon2_padding ">
                <img
                  src="/assets/images/Category.svg"
                  alt="AirLogo"
                  className="sidebar_icons inactivesidebarimage"
                />
                <img
                  src="/assets/images/Category1.svg"
                  alt="AirLogo"
                  className="sidebar_icons activesidebarimage"
                />
                <h5 className="icon_text iconpadding">Manage Category</h5>
              </div>
            </NavLink>

            <NavLink to="queries" className="NavLink">
              <div className="sidebar_icon_section sidebar_icon2_padding ">
                <img
                  src="/assets/images/Query (1).svg"
                  alt="AirLogo"
                  className="sidebar_icons inactivesidebarimage"
                />
                <img
                  src="/assets/images/QueryActive.svg"
                  alt="AirLogo"
                  className="sidebar_icons activesidebarimage"
                />
                <h5 className="icon_text iconpadding">Queries</h5>
              </div>
            </NavLink>
            <NavLink to="payments" className="NavLink">
              <div className="sidebar_icon_section sidebar_icon2_padding ">
                <img
                  src="/assets/images/Payment.svg"
                  alt="AirLogo"
                  className="sidebar_icons inactivesidebarimage"
                />
                <img
                  src="/assets/images/PaymentActive.svg"
                  alt="AirLogo"
                  className="sidebar_icons activesidebarimage"
                />
                <h5 className="icon_text iconpadding">Payment</h5>
              </div>
            </NavLink>
            <NavLink to="" className="link_style">
              <div
                className="border_bottom "
                style={{ paddingTop: "140px" }}
              ></div>
              <div
                className="sidebar_icon_section"
                style={{ paddingTop: "50px", paddingBottom: "60px" }}
                // onClick={logout}
                onClick={() => Logoutpopup(navigate)}
              >
                <img
                  src="/assets/images/Logout.svg"
                  className="sidebar_icons"
                  alt=""
                />
                <h5 className="icon_text iconpadding">LOGOUT</h5>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
