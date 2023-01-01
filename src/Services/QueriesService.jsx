import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(`/api/admin/Query/GetQueries`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const save = async (body) => {
  try {
    const response = await axios.post("/api/admin/Query/ReplyQueries", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
