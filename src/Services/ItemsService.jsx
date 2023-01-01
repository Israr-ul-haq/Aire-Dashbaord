import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/Product/GetAll?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getByCategory = async (body) => {
  try {
    debugger;
    const response = await axios.get(
      `/api/Product/GetAll?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&Id=${body.id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (id) => {
  try {
    const response = await axios.get(`/api/Product/Get?ProductId=${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete(
      "/api/Product/Delete?ProductId=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post("/api/Product/Add", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.put("/api/Product/Update", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
