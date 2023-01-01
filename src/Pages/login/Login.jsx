import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LoginImageSection from "./LoginImageSection";
import { useNavigate } from "react-router";
import { login as LoginAPI } from "../../Services/AuthService";
import Swal from "sweetalert2";
import Loader from "../../constants/Loader";
export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loader, setloader] = useState(true);
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();

  const loginSubmit = async (formData) => {
    debugger;
    formData.deviceId = "1234565432345";
    setBtnLock(true);
    const response = await LoginAPI(formData);
    if (response.data.code === 1) {
      setBtnLock(false);
      localStorage.setItem("AireUser", JSON.stringify(response.data.data));

      setTimeout(() => {
        navigate("/");
        window.location.reload();
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
            <div className="login_section">
              <h3 className="section_heading section_padding">ADMIN PORTAL</h3>
              <h3 className="section_heading section_heading2">
                Welcome Back!
              </h3>
              <p className="section_para para_Padding">
                Sign In to continue to Aire Admin Portal
              </p>
              <form onSubmit={handleSubmit(loginSubmit)}>
                <div className="input_container input_padding">
                  <label className="input_label">Email</label>
                  <input
                    type="text"
                    className="section_input"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="error_validation">Email is required</p>
                  )}
                </div>
                <div className="input_container">
                  <label className="input_label">Password</label>
                  <input
                    type="password"
                    className="section_input"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <p className="error_validation">Password is required</p>
                  )}
                </div>
                <div className="form-check checkbox_padding">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label checkbox_text"
                    for="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
                <div className="button_section_login">
                  <button
                    disabled={btnLock}
                    type="submit"
                    className="Section_button"
                  >
                    Login
                    {btnLock ? <div class="btnloader">{Loader}</div> : ""}
                  </button>
                </div>
              </form>
              <Link to="/account/forgotpassword" className="link_style">
                <p className="checkbox_text">Forgot your password</p>
              </Link>
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
