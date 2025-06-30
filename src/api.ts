
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  schoolName: string;
  email: string;
  password: string;
}

export const loginAdmin = async (data: LoginData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, data);
  return response.data; 
};

export const registerAdmin = async (data: RegisterData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/admin/register`, data);
  return response.data; 
};

