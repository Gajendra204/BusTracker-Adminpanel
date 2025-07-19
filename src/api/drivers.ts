import axiosInstance from "./axiosConfig";

export const getAllDrivers = async () => {
  const response = await axiosInstance.get("/driver");
  return response.data;
};

export const createDriver = async (data: any) => {
  const response = await axiosInstance.post("/driver/create", data);
  return response.data;
};