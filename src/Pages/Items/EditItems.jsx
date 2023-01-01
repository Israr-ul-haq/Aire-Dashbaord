import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../constants/Loader.jsx";
import { uploadImage as uploadImageApi } from "../../GlobalUploadImage/uploadImageService.jsx";
import useDisplayImage from "../../hooks/useDisplayImage.jsx";
import { get } from "../../Services/CategoryService.jsx";
import { save, getById, update } from "../../Services/ItemsService.jsx";

export default function EditItem() {
  const { id } = useParams();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [btnLock, setBtnLock] = useState(false);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState();
  const [uploadImage, setUploadImage] = useState(null);
  const [imageIcon, setImageIcon] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
  });
  const navigate = useNavigate();
  const submitForm = async (formData) => {
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;
    // if (uploadImage === null) {
    //   validationErrorsCopy.uploadImageFirstError = true;
    //   validCount++;
    // } else {
    //   validationErrorsCopy.uploadImageFirstError = false;
    // }

    setValidationErrors(validationErrorsCopy);

    if (validCount > 0) {
      return true;
    }

    setBtnLock(true);

    const body = {
      id: id,
      categoryId: "",
      title: "",
      description: "",
      price: "",
      imageURL: "",
    };
    debugger;
    body.title = formData.title;
    body.description = formData.description;
    body.price = formData.price;
    body.categoryId = formData.categoryId;
    debugger;
    if (uploadImage !== null) {
      const formData1 = new FormData();
      formData1.append("Product", uploadImage);
      const imageResponse1 = await uploadImageApi(formData1);
      body.imageURL = imageResponse1.data.data[0].url;
    }
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
        navigate("/items");
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
      const response = await getById(id);
      if (response.data.data.product.imageURL !== null) {
        setImageIcon(true);
      }
      setData(response.data.data.product);
      reset(response.data.data.product);
      console.log(response.data.data.product);
    })();
  }, [Loader]); //eslint-disable-line

  useEffect(() => {
    lookups();
  }, []); //eslint-disable-line

  const lookups = async () => {
    const response = await get();
    setCategory(response.data.data.categories);
    if (response.data.code === 0) {
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
            <Link to="/items" className="NavLink">
              <div className="arrow_back">
                <img src="/assets/images/backArrow.svg" alt="" />
                <h1 className="heading_text">Edit Service Items</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="header_main_section">
          <div className="section_main_heading">
            <h4 className="rider_main_heading">Item Details</h4>
          </div>
          <div className="border_contains">
            <div className="border_bottom_item"></div>
          </div>

          <div className="users_main_section">
            <div className="row" style={{ paddingBottom: "50px" }}>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label">ITEM NAME</label>
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
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label">ITEM DESCRIPTION</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("description", { required: true })}
                  />
                  {errors.description?.type === "required" && (
                    <p className="error_validation">Description is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label for="" className="input_label">
                    CATEGORY TYPE
                  </label>
                  <select
                    className="section_input main_input dropdown_input"
                    {...register("categoryId", { required: true })}
                  >
                    {category?.map((item) => {
                      if (item.id === data?.categoryId) {
                        return (
                          <option selected value={item.id}>
                            {item.title}
                          </option>
                        );
                      } else {
                        return <option value={item.id}>{item.title}</option>;
                      }
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">PRICE</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("price", { required: true })}
                  />
                  {errors.price?.type === "required" && (
                    <p className="error_validation">Price is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label
                    htmlFor="inputFile"
                    className="input_label input_icon_align"
                  >
                    UPLOAD ITEM IMAGE
                  </label>
                  {imageIcon ? (
                    <img
                      src="/assets/images/file_upload_btue.svg"
                      alt=""
                      className="placeholder_image input_icon_align1"
                    />
                  ) : (
                    ""
                  )}

                  <div className="section_input main_input" id="inputFile">
                    <input
                      type="file"
                      className="file_upload"
                      onChange={(e) => {
                        setUploadImage(e.target.files[0]);
                        setImageIcon(true);
                      }}
                    />
                    {validationErrors.uploadImageFirstError ? (
                      <p className="error_validation">Image is Required</p>
                    ) : (
                      ""
                    )}
                    <h5 className="input_text_upload">Upload</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button_section">
          <Link to="/items">
            <button className="cancel_button">Cancel</button>
          </Link>
          <button className="save_button">
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
