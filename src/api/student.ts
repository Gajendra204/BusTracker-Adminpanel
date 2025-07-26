import axiosInstance from "./axiosConfig";
import type { CreateStudentData } from "./types";

export const getStudentsByRoute = async (routeId: string, classFilter?: number) => {
  const url = `/students/route/${routeId}${
    classFilter ? `?class=${classFilter}` : ""
  }`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const createStudent = async (routeId: string, data: CreateStudentData) => {
  const response = await axiosInstance.post(`/students/route/${routeId}`, data);
  return response.data;
};

export const updateStudent = async (id: string, data: Partial<CreateStudentData>) => {
  const response = await axiosInstance.put(`/students/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id: string) => {
  const response = await axiosInstance.delete(`/students/${id}`);
  return response.data;
};