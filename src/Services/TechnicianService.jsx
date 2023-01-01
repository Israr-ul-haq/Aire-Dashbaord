import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    debugger;
    const response = await axios.get(
      `/api/Admin/GetAllTechnicians?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&Search=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (id) => {
  try {
    const response = await axios.get(`/api/Admin/GetById/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete("/api/Admin/DeleteUser/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post("/api/Admin/AddTechnician", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.put("/api/Admin/UpdateTechnician", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const approveApi = async (id) => {
  try {
    const response = await axios.put(`/api/Admin/ActivateAccount?UserId=${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
