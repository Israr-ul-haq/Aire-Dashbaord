import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../constants/Loader";
import { save } from "../../Services/QueriesService";

function ViewQuery() {
  const { id, status } = useParams();
  const [btnLock, setBtnLock] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const submitForm = async (formData) => {
    debugger;

    setBtnLock(true);
    const body = {
      customerQueryId: Number(id),
      replyMessage: formData.replyMessage,
    };

    const response = await save(body);

    if (response.data.code === 1) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
      setTimeout(() => {
        navigate("/queries");
      }, 0);
    }

    if (response.data.code === 0) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="main_heading">
          <div className="main_heading_flex">
            <Link to="/queries" className="NavLink">
              <div className="arrow_back">
                <img src="/assets/images/backArrow.svg" alt="" />
                <h1 className="heading_text">Manage Queries</h1>
              </div>
            </Link>
          </div>
        </div>

        <div className="header_main_section">
          <div className="section_primary_heading">
            <h4 className="rider_main_heading vehicle_heading">Reply Query</h4>
          </div>
          <div className="view_layout_primary_header">
            <div className="layout_flex"></div>
          </div>
          <div className="row" style={{ paddingBottom: "50px" }}>
            <div className="col-md-12">
              <div className="input_container input_padding_main">
                <textarea
                  placeholder="Type here"
                  className="section_input main_input "
                  style={{ height: "115px", marginLeft: "28px" }}
                  {...register("replyMessage", { required: true })}
                ></textarea>
                {errors.replyMessage?.type === "required" && (
                  <p className="error_validation">Message is required</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="button_section">
          <Link to="/queries">
            <button className="cancel_button">Cancel</button>
          </Link>

          {status === "false" && (
            <button className="save_button">
              {btnLock ? (
                <div class="btnloader1 button_loader">{Loader}</div>
              ) : (
                "Resolve"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ViewQuery;
