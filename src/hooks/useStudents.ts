import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStudentsByRoute,
  createStudent as apiCreateStudent,
  deleteStudent as apiDeleteStudent,
} from "../api/student";
import type { IStudent, CreateStudentData } from "../api/types";
import toast from "react-hot-toast";

export const useStudents = () => {
  const queryClient = useQueryClient();

  // Fetch Students by Route with Caching
  const fetchStudentsByRoute = async (routeId: string, classFilter?: number) => {
    if (!routeId) return [];
    
    try {
      const response = await getStudentsByRoute(routeId, classFilter);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch students";
      toast.error(errorMessage);
      throw err;
    }
  };

  // Create Student
  const createStudentMutation = useMutation({
    mutationFn: ({ routeId, studentData }: { routeId: string; studentData: CreateStudentData }) =>
      apiCreateStudent(routeId, studentData),
    onSuccess: (newStudent, variables) => {
      const queryKey = ['students', variables.routeId];
      queryClient.setQueryData(queryKey, (oldStudents: IStudent[] = []) => [
        ...oldStudents,
        newStudent.data
      ]);
      toast.success("Student added successfully");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to add student";
      toast.error(errorMessage);
    },
  });

  // Delete Student
  const deleteStudentMutation = useMutation({
    mutationFn: apiDeleteStudent,
    onSuccess: (_, deletedStudentId) => {
      queryClient.setQueriesData(
        { queryKey: ['students'] },
        (oldStudents: IStudent[] = []) =>
          oldStudents.filter(student => student._id !== deletedStudentId)
      );
      toast.success("Student deleted successfully");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to delete student";
      toast.error(errorMessage);
    },
  });

  return {
    // Actions
    fetchStudentsByRoute,
    
    // Mutations
    addStudent: (routeId: string, studentData: CreateStudentData) =>
      createStudentMutation.mutateAsync({ routeId, studentData }),
    deleteStudent: (studentId: string) => deleteStudentMutation.mutateAsync(studentId),
    
    // Mutation states
    isCreating: createStudentMutation.isPending,
    isDeleting: deleteStudentMutation.isPending,
  };
};

// Use Students by Route with React Query
export const useStudentsByRoute = (routeId: string, classFilter?: number) => {
  const {
    data: students = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['students', routeId, classFilter],
    queryFn: () => {
      if (!routeId) return [];
      return getStudentsByRoute(routeId, classFilter).then(response => response.data);
    },
    enabled: !!routeId, 
    staleTime: 2 * 60 * 1000, 
  });

  return {
    students,
    isLoading,
    error,
    refetch,
  };
};