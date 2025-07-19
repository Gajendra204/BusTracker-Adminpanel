import axiosInstance from "./axiosConfig";
import type { IBus } from "./types";

export const getAllBuses = async () => {
  const response = await axiosInstance.get("/buses");
  return response.data;
};

export const createBus = async (data: Omit<IBus, "_id">) => {
  const response = await axiosInstance.post("/buses/create-bus", data);
  return response.data;
};

export const assignDriverToBus = async (data: { busId: string, driverId: string }) => {
  const response = await axiosInstance.patch("/buses/assign-driver", data);
  return response.data;
};