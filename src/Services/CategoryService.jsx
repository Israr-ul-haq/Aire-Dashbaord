import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(`/api/Category/GetAll`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (id) => {
  try {
    const response = await axios.get(`/api/Category/GetByID?CategoryId=${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete(
      "/api/Category/Delete?CategoryId=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post("/api/Category/Add", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.put("/api/Category/Update", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
