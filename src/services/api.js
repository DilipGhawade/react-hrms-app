import axios from "axios";
import { data } from "react-router-dom";

const API_BASE_URL = "http://localhost:3001";
export const api = {
  addEmployee: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, data);
      console.log("Response:", response.data);
      return { success: "true", data: response.data };
    } catch (error) {
      console.error("Error occurred while adding employee:", error);
      return { success: "false", error: error.response?.data || error.message };
    }
  },

  getAllEmployee: async () => {
    try {
      const resp = await axios.get(`${API_BASE_URL}/users`);
      console.log(`Response: ${resp.data}`);
      return { success: true, data: resp.data };
    } catch (error) {
      console.error("Error while fetching the user");
      return { success: false, error: error.response?.data || error.message };
    }
  },
};
