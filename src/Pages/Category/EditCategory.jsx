import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../constants/Loader.jsx";

import { getById, save, update } from "../../Services/CategoryService.jsx";

export default function EditCategory() {
  const { id } = useParams();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [btnLock, setBtnLock] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
  });

  const navigate = useNavigate();
  const submitForm = async (formData) => {
    debugger;
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;

    setValidationErrors(validationErrorsCopy);

    if (validCount > 0) {
      return true;
    }

    setBtnLock(true);

    const body = {
      id: id,
      title: "",
      description: "",
    };

    body.title = formData.title;
    body.description = formData.description;
    const response = await update(body);

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
        navigate("/category");
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
  useEffect(() => {
    (async () => {
      debugger;
      const response = await getById(id);
      reset(response.data.data.category);
    })();
  }, [Loader]); //eslint-disable-line

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="main_heading">
          <div className="main_heading_flex">
            <Link to="/category" className="NavLink">
              <div className="arrow_back">
                <img src="/assets/images/backArrow.svg" alt="" />
                <h1 className="heading_text">Edit Category</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="header_main_section">
          <div className="users_main_section">
            <div className="row" style={{ padding: "50px 0" }}>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label">CATEGORY TITLE</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("title", { required: true })}
                  />
                  {errors.title?.type === "required" && (
                    <p className="error_validation">Title is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="input_container input_padding_main">
                  <label className="input_label text_area_label">
                    DESCRIPTION
                  </label>
                  <textarea
                    placeholder="Enter"
                    className="section_input main_input textArea_input"
                    {...register("description", { required: true })}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button_section">
          <Link to="/services">
            <button className="cancel_button">Cancel</button>
          </Link>
          <button type="submit" className="save_button">
            {btnLock ? (
              <div class="btnloader1 button_loader">{Loader}</div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
