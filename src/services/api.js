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

  punchIn: async (data) => {
    // console.log("punc in data form api ", JSON.stringify(data, null, 2));

    try {
      const response = await axios.post(`${API_BASE_URL}/punches`, data);
      console.log(`Response:`, response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("error while punch in", error);
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  },
  applyLeave: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/leaves`, data);
      console.log(`Response:`, response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("error while punch in", error);
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  },
  getLeaveByUserId: async (userId) => {
    console.log(`the user id is => ${userId}`);

    try {
      const resp = await axios.get(`${API_BASE_URL}/leaves?userId=${userId}`);
      console.log(`Response: ${resp.data}`);
      return { success: true, data: resp.data };
    } catch (error) {
      console.error("Error while fetching the user");
      return { success: false, error: error.response?.data || error.message };
    }
  },
  getAllLeaves: async () => {
    try {
      const [leavesResp, usersResp] = await Promise.all([
        axios.get(`${API_BASE_URL}/leaves`),
        axios.get(`${API_BASE_URL}/users`),
      ]);

      const hrUserIds = usersResp.data
        .filter((user) => user.role === "hr")
        .map((user) => user.id);

      const filteredLeaves = leavesResp.data.filter(
        (leave) => !hrUserIds.includes(leave.userId)
      );

      return { success: true, data: filteredLeaves };
    } catch (error) {
      console.error("Error while fetching the leaves:", error);
      return { success: false, error: error.response?.data || error.message };
    }
  },
  getAllPunchInOutData: async (userId) => {
    try {
      const resp = await axios.get(`${API_BASE_URL}/punches?userId=${userId}`);
      console.log(`Response: ${resp.data}`);
      return { success: true, data: resp.data };
    } catch (error) {
      console.error("Error while fetching the user");
      return { success: false, error: error.response?.data || error.message };
    }
  },

  updateLeave: async (leaveId, updatedData) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/leaves/${leaveId}`,
        updatedData
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Update Leave Error", error);
      return { success: false, error: error.response?.data || error.message };
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
