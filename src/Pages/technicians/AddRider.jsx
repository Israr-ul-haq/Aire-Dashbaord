import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../constants/Loader.jsx";
import { uploadImage as uploadImageApi } from "../../GlobalUploadImage/uploadImageService.jsx";
import useDisplayImage from "../../hooks/useDisplayImage.jsx";
import { getExperience, getSkills } from "../../Services/LookUpService.jsx";
import { save } from "../../Services/TechnicianService";

export default function AddRider() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [btnLock, setBtnLock] = useState(false);
  const [loader, setLoader] = useState(false);
  const [uploadImage1, setUploadImage1] = useState(null);
  const [uploadImage2, setUploadImage2] = useState(null);
  const [uploadImage3, setUploadImage3] = useState(null);
  const [imageIcon1, setImageIcon1] = useState(false);
  const [imageIcon2, setImageIcon2] = useState(false);
  const [imageIcon3, setImageIcon3] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
  const [experData, setExperData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
    uploadImageSecoundError: false,
    uploadImageThirdError: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    lookups();
  }, [Loader]); //eslint-disable-line

  const lookups = async () => {
    setLoader(true);
    const response = await getExperience();
    const response1 = await getSkills();
    setSkillsData(response1.data.data.skills);
    setExperData(response.data.data.experience);
    setLoader(false);
    if (response.data.code === 0 || response1.data.code === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
  };

  const submitForm = async (formData) => {
    debugger;
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;
    if (uploadImage1 === null) {
      validationErrorsCopy.uploadImageFirstError = true;
      validCount++;
    } else {
      validationErrorsCopy.uploadImageFirstError = false;
    }
    if (uploadImage2 === null) {
      validationErrorsCopy.uploadImageSecoundError = true;
      validCount++;
    } else {
      validationErrorsCopy.uploadImageSecoundError = false;
    }
    if (uploadImage3 === null) {
      validationErrorsCopy.uploadImageThirdError = true;
      validCount++;
    } else {
      validationErrorsCopy.uploadImageThirdError = false;
    }

    setValidationErrors(validationErrorsCopy);

    if (validCount > 0) {
      return true;
    }

    setBtnLock(true);

    const body = {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      profilePicPath: "",
      deviceId: "15416",
      address: "",
      companyName: "",
      cac: "",
      userExperience: {
        ExperienceYears: 0,
        skillLevel: "",
      },
      userVehicalInfo: {
        name: "",
        make: "",
        model: "",
        year: 0,
        color: "",
        licensePlate: "",
      },
      userDocument: {
        license: "",
        epaCertificate: "",
      },
      location: {
        lat: 0,
        lng: 0,
      },
    };

    body.firstName = formData.firstName;
    body.lastName = formData.lastName;
    body.middleName = formData.middleName;
    body.email = formData.email;
    body.phoneNumber = formData.phoneNumber;
    body.password = formData.password;
    body.address = formData.address;
    body.companyName = formData.companyName;
    body.cac = formData.cac;
    body.userExperience.ExperienceYears = formData.ExperienceYears;
    body.userExperience.skillLevel = formData.skillLevel;
    body.userVehicalInfo.name = formData.name;
    body.userVehicalInfo.make = formData.make;
    body.userVehicalInfo.year = formData.year;
    body.userVehicalInfo.color = formData.color;
    body.userVehicalInfo.licensePlate = formData.licensePlate;

    //hard Coded Lat lng
    body.location.lat = 1055669;
    body.location.lng = 1000252;

    debugger;
    //image1
    const formData1 = new FormData();
    formData1.append("profileImage", uploadImage1);
    const imageResponse1 = await uploadImageApi(formData1);
    body.profilePicPath = imageResponse1.data.data[0].url;
    //image2
    const formData2 = new FormData();
    formData2.append("License", uploadImage2);
    const imageResponse2 = await uploadImageApi(formData2);
    body.userDocument.license = imageResponse2.data.data[0].url;
    //image3
    const formData3 = new FormData();
    formData3.append("Certificate", uploadImage3);
    const imageResponse3 = await uploadImageApi(formData3);
    body.userDocument.epaCertificate = imageResponse3.data.data[0].url;
    //body
    const response = await save(body);
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
        navigate("/riders");
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

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="main_heading">
          <div className="main_heading_flex">
            <Link to="/riders" className="NavLink">
              <div className="arrow_back">
                <img src="/assets/images/backArrow.svg" alt="" />
                <h1 className="heading_text">Add Technician</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="header_main_section">
          <div className="section_main_heading">
            <h4 className="rider_main_heading">Technician Detail</h4>
          </div>
          <div className="border_contains">
            <div className="border_bottom_item"></div>
          </div>
          <div className="users_main_section">
            <div className="row" style={{ paddingBottom: "50px" }}>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label
                    htmlFor="inputFile"
                    className="input_label input_icon_align"
                  >
                    UPLOAD PROFILE IMAGE
                  </label>
                  {imageIcon1 ? (
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
                        setUploadImage1(e.target.files[0]);
                        setImageIcon1(true);
                      }}
                    />
                    <h5 className="input_text_upload">Upload</h5>
                    {validationErrors.uploadImageFirstError ? (
                      <p className="error_validation">Image is Required</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label">FIRST NAME</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName?.type === "required" && (
                    <p className="error_validation">First name is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label">MIDDLE NAME</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("middleName")}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label">LAST NAME</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName?.type === "required" && (
                    <p className="error_validation">Last name is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">EMAIL</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="error_validation">Email is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">PHONE NUMBER</label>
                  <input
                    maxLength={11}
                    onInput={maxLengthCheck}
                    type="number"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("phoneNumber", { required: true })}
                  />
                  {errors.phoneNumber?.type === "required" && (
                    <p className="error_validation">PhoneNumber is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">PASSWORD</label>
                  <input
                    type="password"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <p className="error_validation">Password is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">ADDRESS</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("address", { required: true })}
                  />
                  {errors.address?.type === "required" && (
                    <p className="error_validation">Address is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">COMPANY</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("companyName", { required: true })}
                  />
                  {errors.companyName?.type === "required" && (
                    <p className="error_validation">Company is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">CAC#</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("cac", { required: true })}
                  />
                  {errors.cac?.type === "required" && (
                    <p className="error_validation">CAC# is required</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label for="" className="input_label">
                    SKILL LEVEL
                  </label>

                  <select
                    className="section_input main_input"
                    {...register("skillLevel", { required: true })}
                  >
                    <option selected>Select</option>
                    {skillsData.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                  {errors.skillLevel?.type === "required" && (
                    <p className="error_validation">Skill Level is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label for="" className="input_label">
                    EXPERIENCE
                  </label>
                  <select
                    className="section_input main_input"
                    {...register("ExperienceYears", { required: true })}
                  >
                    <option selected>Select</option>
                    {experData.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="section_main_heading">
            <h4 className="rider_main_heading">Vehicle Information</h4>
          </div>
          <div className="border_contains">
            <div className="border_bottom_item"></div>
          </div>
          <div className="users_main_section">
            <div className="row" style={{ paddingBottom: "130px" }}>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label">VEHCILE NAME</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <p className="error_validation">Name is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">MAKE</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("make", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <p className="error_validation">Make is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">MODEL</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("model", { required: true })}
                  />
                  {errors.model?.type === "required" && (
                    <p className="error_validation">Model is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">YEAR</label>
                  <input
                    type="number"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("year", { required: true })}
                  />
                  {errors.year?.type === "required" && (
                    <p className="error_validation">Year is required</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">LICENSE PLATE</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("licensePlate", { required: true })}
                  />
                  {errors.licensePlate?.type === "required" && (
                    <p className="error_validation">
                      License plate is required
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label className="input_label ">COLOR</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="section_input main_input"
                    {...register("color", { required: true })}
                  />
                  {errors.color?.type === "required" && (
                    <p className="error_validation">Color is required</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="section_main_heading">
            <h4 className="rider_main_heading">Document Information</h4>
          </div>
          <div className="border_contains">
            <div className="border_bottom_item"></div>
          </div>
          <div className="users_main_section">
            <div className="row" style={{ paddingBottom: "50px" }}>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label
                    for="inputFile"
                    className="input_label input_icon_align"
                  >
                    EPA CERFICATE
                  </label>
                  {imageIcon2 ? (
                    <img
                      src="/assets/images/file_upload_btue.svg"
                      alt=""
                      className="placeholder_image input_icon_align1"
                    />
                  ) : (
                    ""
                  )}
                  <div className="section_input main_input " id="inputFile">
                    <input
                      type="file"
                      className="file_upload"
                      onChange={(e) => {
                        setUploadImage2(e.target.files[0]);
                        setImageIcon2(true);
                      }}
                    />
                    <h5 className="input_text_upload">Upload</h5>
                    {validationErrors.uploadImageSecoundError ? (
                      <p className="error_validation">
                        Certificate is Required
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_container input_padding_main">
                  <label
                    htmlFor="inputFile"
                    className="input_label input_icon_align input_icon_align"
                  >
                    UPLOAD LICENSE
                  </label>
                  {imageIcon3 ? (
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
                        setUploadImage3(e.target.files[0]);
                        setImageIcon3(true);
                      }}
                    />
                    <h5 className="input_text_upload">Upload</h5>
                    {validationErrors.uploadImageThirdError ? (
                      <p className="error_validation">License is Required</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button_section">
          <Link to="/riders">
            <button className="cancel_button">Cancel</button>
          </Link>
          <button className="save_button">
            {btnLock ? (
              <div class="btnloader1 button_loader">{Loader}</div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
