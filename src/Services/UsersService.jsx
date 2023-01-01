import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/Admin/GetAllCustomers?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&Search=${body.search}`
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
