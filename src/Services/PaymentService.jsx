import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/Dashboard/Payment?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&Search=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
