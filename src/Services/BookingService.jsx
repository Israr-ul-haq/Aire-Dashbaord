import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/Order/GetAll?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&Search=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (id) => {
  try {
    const response = await axios.get(`/api/Order/Get?orderId=${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getReviews = async (orderId) => {
  try {
    const response = await axios.get(`/api/Order/GetReview?OrderId=${orderId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete("/api/Order/Delete?orderID=" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post("/api/Service/Create", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.put("/api/Service/Update", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
