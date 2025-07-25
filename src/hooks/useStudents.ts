import { useState} from "react";
import {
  getStudentsByRoute,
  createStudent as apiCreateStudent,
  deleteStudent as apiDeleteStudent,
} from "../api/student";
import type { IStudent, CreateStudentData } from "../api/types";

export const useStudents = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStudentsByRoute = async (routeId: string, classFilter?: number) => {
     if (!routeId) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await getStudentsByRoute(routeId, classFilter);
      setStudents(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch students");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addStudent = async (studentData: CreateStudentData) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await apiCreateStudent(studentData.routeId, studentData);
      setStudents((prev) => [...prev, response.data]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add student");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStudent = async (studentId: string) => {
    setIsLoading(true);
    setError("");
    try {
      await apiDeleteStudent(studentId);
      setStudents((prev) => prev.filter((s) => s._id !== studentId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete student");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    students,
    isLoading,
    error,
    fetchStudentsByRoute,
    addStudent,
    deleteStudent,
  };
};