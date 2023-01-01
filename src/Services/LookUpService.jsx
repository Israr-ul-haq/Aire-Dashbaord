import axios from "../constants/AxiosConfig";

export const getExperience = async (body) => {
  try {
    const response = await axios.get(`/api/LookUp/Experience`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getSkills = async (id) => {
  try {
    const response = await axios.get(`/api/LookUp/Skills`);
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
