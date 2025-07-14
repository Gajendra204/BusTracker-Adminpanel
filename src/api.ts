import axios from "axios";

const API_BASE_URL = "https://api-bus-tracker.onrender.com/api";

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

export type AdminProfile = {
  name: string;
  schoolName: string;
  email: string;
};

interface LoginResponse {
  token: string;
  message: string;
}

export const loginAdmin = async (data: LoginData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, data);
  return response.data; 
};

export const registerAdmin = async (data: RegisterData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/admin/register`, data);
  return response.data; 
};


// Bus API's
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

// Driver API's
export const getAllDrivers = async () => {
  const response = await axios.get(`${API_BASE_URL}/driver`);
  return response.data;
};

export const createDriver = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/driver/create`, data);
  return response.data;
};

export const login = async (email: string, password: string): Promise<{ data: LoginResponse }> => {
  const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, { email, password });
  return response;
};

export const register = async (
  name: string,
  email: string,
  password: string,
  schoolName: string
): Promise<{ data: LoginResponse }> => {
  const response = await axios.post(`${API_BASE_URL}/auth/admin/register`, {
    name,
    email,
    password,
    schoolName,
  });
  return response;
};

