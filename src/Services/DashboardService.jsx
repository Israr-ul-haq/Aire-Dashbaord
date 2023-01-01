import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(`/api/Dashboard/GetDashboardCounts`);
    return response;
  } catch (error) {
    return error.response;
  }
};
