import axiosInstance from "./axiosConfig";
import type { LoginData, RegisterData} from "./types";

export const loginAdmin = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/admin/login", data);
    const token = response.data.data.token;    
    localStorage.setItem("busTrackerAdminToken", token); 
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerAdmin = async (data: RegisterData) => {
  const response = await axiosInstance.post("/auth/admin/register", data);
  return response.data;
};

