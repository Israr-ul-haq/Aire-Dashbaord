import axios from "../constants/AxiosConfig";

export const login = async (body) => {
  try {
    const response = await axios.post("/api/Admin/Login", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const forgotPassword = async (body) => {
  try {
    const response = await axios.post(
      "/api/Admin/ForgotPassword?email=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
