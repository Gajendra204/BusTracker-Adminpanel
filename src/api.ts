
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

//Add an interceptor to attach the token to every request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

// BUS APIs
export const getAllBuses = async () => {
  const response = await axios.get(`${API_BASE_URL}/buses`);
  return response.data;
};

export const createBus = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/buses/create-bus`, data);
  return response.data;
};

export const assignDriverToBus = async (data: any) => {
  const response = await axios.patch(`${API_BASE_URL}/buses/assign-driver`, data);
  return response.data;
};

// DRIVER APIs
export const getAllDrivers = async () => {
  const response = await axios.get(`${API_BASE_URL}/driver`);
  return response.data;
};

export const createDriver = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/driver/create`, data);
  return response.data;
};

