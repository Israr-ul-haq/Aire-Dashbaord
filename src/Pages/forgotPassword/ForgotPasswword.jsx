import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { forgotPassword } from "../../Services/AuthService";
import LoginImageSection from "../login/LoginImageSection";

export default function ForgotPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loader, setloader] = useState(true);
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();

  const forgotSubmit = async (formData) => {
    debugger;
    setBtnLock(true);
    const response = await forgotPassword(formData);
    if (response.data.code === 1) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
      setTimeout(() => {
        navigate("/account/login");
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
    <div className="Sidebar_section">
      <div className="row section_row">
        <div className="col-md-3">
          <div className="background_section">
            <div className="Sidebar_constainer">
              <img
                src="/assets/images/Logo.png"
                alt="AirLogo"
                className="logo_img_size"
              />
            </div>
            <div className="border_bottom"></div>
            <div className="login_section forgot_password_padding">
              <h3 className="section_heading">Forgot Password</h3>
              <p className="section_para">Please enter your email</p>
              <form onSubmit={handleSubmit(forgotSubmit)}>
                <div className="input_container input_padding">
                  <label className="input_label">Email</label>
                  <input
                    type="text"
                    className="section_input"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="error_validation">Email is Required</p>
                  )}
                </div>

                <div className="button_section">
                  <button type="submit" className="Section_button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="border_bottom align_right"></div>
          </div>
        </div>
        <div className="col-md-9">
          <LoginImageSection />
        </div>
      </div>
    </div>
  );
}
