import React, { useEffect, useState } from "react";
import { get } from "../../Services/DashboardService";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcBorderRadius,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashBoard() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [labels, setLabel] = useState(["Completed", "Pending"]);
  const [value, setValue] = useState([]);
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await get();
    debugger;
    setData(response.data.data);
    setValue(response.data.data.thisMonthCompletedJobs);
    setValue1(response.data.data.thisMonthScheduledJobs);

    setLoading(false);
  };

  const data1 = {
    labels,
    datasets: [
      {
        data: [value, value1],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgb(0,0,255)"],
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        position: "top left",
        // text: "Doughnut chart",
      },
    },
  };

  return (
    <div>
      <div className="main_heading">
        <h1 className="heading_text">Dashboard</h1>
      </div>
      <div className="dashboard_stats">
        <div className="dashboard_inner_section">
          <div style={{ paddingBottom: "55px" }}>
            <img
              src="/assets/images/Users_dashboard.svg"
              className="ActiveImage"
              alt=""
            />
            <img
              src="/assets/images/User-1.png"
              className="InActiveImage"
              alt=""
            />
          </div>
          <div className="stats_primay_section">
            <h5 className="stat_main_text">Total Users</h5>
            <div className="stats_secoundary_section">
              <img src="/assets/images/growth.svg" alt="" />
            </div>
          </div>

          <div className="stats_lower_section">
            <h5 className="stat_text">{data?.totalUsers}</h5>
            <p className="stats_potential_growth">Potential growth</p>
          </div>
        </div>
        <div className="dashboard_inner_section">
          <div style={{ paddingBottom: "55px" }}>
            <img
              src="/assets/images/Rider.svg "
              className="ActiveImage"
              alt=""
            />
            <img
              src="/assets/images/Rider-1.png"
              className="InActiveImage"
              alt=""
            />
          </div>
          <div className="stats_primay_section">
            <h5 className="stat_main_text">Total Technicians</h5>
            <div className="stats_secoundary_section">
              <img src="/assets/images/growth.svg" alt="" />
            </div>
          </div>

          <div className="stats_lower_section">
            <h5 className="stat_text">{data?.totalTechnicians}</h5>
            <p className="stats_potential_growth">Potential growth</p>
          </div>
        </div>
        <div className="dashboard_inner_section">
          <div style={{ paddingBottom: "55px" }}>
            <img
              src="/assets/images/Service_stats.svg"
              className="ActiveImage"
              alt=""
            />
            <img
              src="/assets/images/Service-1.png"
              className="InActiveImage"
              alt=""
            />
          </div>
          <div className="stats_primay_section">
            <h5 className="stat_main_text">Total Bookings</h5>
            <div className="stats_secoundary_section">
              <img src="/assets/images/growth.svg" alt="" />
            </div>
          </div>
          <div className="stats_lower_section">
            <h5 className="stat_text">{data?.totalOrders}</h5>
            <p className="stats_potential_growth">Potential growth</p>
          </div>
        </div>
        <div className="dashboard_inner_section">
          <div style={{ paddingBottom: "55px" }}>
            <img
              src="/assets/images/Items_stats.svg"
              className="ActiveImage"
              alt=""
            />
            <img
              src="/assets/images/Items-1.png"
              className="InActiveImage"
              alt=""
            />
          </div>
          <div className="stats_primay_section">
            <h5 className="stat_main_text">Total Items</h5>
            <div className="stats_secoundary_section">
              <img src="/assets/images/growth.svg" alt="" />
            </div>
          </div>

          <div className="stats_lower_section">
            <h5 className="stat_text">{data?.totalItems}</h5>
            <p className="stats_potential_growth">Potential growth</p>
          </div>
        </div>
      </div>
      <div className="stats_visit_section">
        <div className="row">
          <div className="col-md-5">
            <div className="visit_primary_section">
              <h5 className="stats_secondary_heading">Order Overview</h5>
              {/* <p className="visit_date_text padding_visit_text">11 Jan 2022 </p> */}
            </div>

            <div className="stats_orders_box">
              <div className="stats_orders_padding">
                <div className="visit_primary_section">
                  <h5 className="section_heading">Service Orders</h5>
                  <p className="visit_date_text padding_visit_text">
                    This month
                  </p>
                </div>
                <div className="order_graph">
                  {/* <img src="/assets/images/Graph.svg" alt="" /> */}
                  <Doughnut options={options} data={data1} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="visit_primary_section">
              <h5 className="stats_secondary_heading">Total Visits</h5>
              {/* <p className="visit_date_text padding_visit_text">11 Jan 2022 </p> */}
            </div>

            <div className="stats_orders_box">
              <div className="stats_visits_padding">
                <div className="all_visits_section">
                  <div className="visits_flex_section">
                    {/* <img
                      src="/assets/images/stats_load.png"
                      className="visit_Image stats_inactive_image"
                      alt=""
                    />
                    <img
                      src="/assets/images/stats_white.png"
                      className="visit_Image stats_active_Image"
                      alt=""
                    /> */}
                    <CircularProgressbar
                      value={data?.lastMonthTotalJobs}
                      text={`${(data?.lastMonthTotalJobs * 100) / 1000}%`}
                      className="visit_Image"
                    />
                    <div>
                      <h5 className="section_heading">All Visits</h5>
                      <div className="visits_flex_section">
                        <p className="visit_date_text">Last Month -2022</p>
                        {/* <p className="visit_date_text">12 January 12:30</p> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="all_visits_section">
                  <div className="visits_flex_section">
                    {/* <img
                      src="/assets/images/stats_load.png"
                      className="visit_Image stats_inactive_image"
                      alt=""
                    />
                    <img
                      src="/assets/images/stats_white.png"
                      className="visit_Image stats_active_Image"
                      alt=""
                    /> */}
                    <CircularProgressbar
                      value={data?.lastMonthNewCustomerJobs}
                      text={`${(data?.lastMonthNewCustomerJobs * 100) / 1000}%`}
                      className="visit_Image"
                    />
                    <div>
                      <h5 className="section_heading">New Visits</h5>
                      <div className="visits_flex_section">
                        <p className="visit_date_text">Last Month -2022</p>
                        {/* <p className="visit_date_text">12 January 12:30</p> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="all_visits_section">
                  <div className="visits_flex_section">
                    {/* <img
                      src="/assets/images/stats_load.png"
                      className="visit_Image stats_inactive_image"
                      alt=""
                    />
                    <img
                      src="/assets/images/stats_white.png"
                      className="visit_Image stats_active_Image"
                      alt=""
                    /> */}
                    <CircularProgressbar
                      value={data?.lastMonthCancelledJobs}
                      text={`${(data?.lastMonthCancelledJobs * 100) / 1000}%`}
                      className="visit_Image"
                    />
                    <div>
                      <h5 className="section_heading">Cancelled Visits</h5>
                      <div className="visits_flex_section">
                        <p className="visit_date_text">Last Month -2022</p>
                        {/* <p className="visit_date_text">12 January 12:30</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
