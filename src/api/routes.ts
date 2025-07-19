import axiosInstance from "./axiosConfig";
import type { CreateRouteData, UpdateRouteData, AssignBusData } from "./types";

export const getAllRoutes = async () => {
  const response = await axiosInstance.get("/routes");
  return response.data;
};

export const getRouteById = async (id: string) => {
  const response = await axiosInstance.get(`/routes/${id}`);
  return response.data;
};

export const createRoute = async (data: CreateRouteData) => {
  const response = await axiosInstance.post("/routes", data);
  return response.data;
};

export const updateRoute = async (id: string, data: UpdateRouteData) => {
  const response = await axiosInstance.put(`/routes/${id}`, data);
  return response.data;
};

export const deleteRoute = async (id: string) => {
  const response = await axiosInstance.delete(`/routes/${id}`);
  return response.data;
};

export const assignBusToRoute = async (routeId: string, data: AssignBusData) => {
  const response = await axiosInstance.patch(`/routes/${routeId}/assign-bus`, data);
  return response.data;
};