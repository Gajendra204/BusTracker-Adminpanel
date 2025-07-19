import axiosInstance from "./axiosConfig";

export const getAllDrivers = async () => {
  const response = await axiosInstance.get("/driver");
  return response.data;
};

export const createDriver = async (data: any) => {
  const response = await axiosInstance.post("/driver/create", data);
  return response.data;
};

export const updateDriver = async (id: string, data: { name: string; phone: string }) => {
  const response = await axiosInstance.put(`/driver/${id}`, data);
  return response.data;
};

export const deleteDriver = async (id: string) => {
  const response = await axiosInstance.delete(`/driver/${id}`);
  return response.data;
}