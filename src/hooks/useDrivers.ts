import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllDrivers, createDriver, deleteDriver, updateDriver } from "../api/drivers";
import toast from "react-hot-toast";
import type { IDriver } from "../api/types";

export const useDrivers = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ name: "", phone: "" });

  // Fetch Drivers
  const {
    data: drivers = [],
    isLoading,
    error,
    refetch: refetchDrivers
  } = useQuery({
    queryKey: ['drivers'],
    queryFn: async () => {
      const response = await getAllDrivers();
      return response.data || [];
    },
  });

  // Create Driver
  const createDriverMutation = useMutation({
    mutationFn: createDriver,
    onSuccess: (newDriver) => {
      queryClient.setQueryData(['drivers'], (oldDrivers: IDriver[] = []) => [
        ...oldDrivers,
        newDriver.data
      ]);
      toast.success("Driver added");
    },
    onError: () => {
      toast.error("Error creating driver");
    },
  });

  // Update Driver
  const updateDriverMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string; phone: string } }) =>
      updateDriver(id, data),
    onSuccess: (updatedDriver, variables) => {
      queryClient.setQueryData(['drivers'], (oldDrivers: IDriver[] = []) =>
        oldDrivers.map(driver => driver._id === variables.id ? updatedDriver.data : driver)
      );
      toast.success("Driver updated successfully");
    },
    onError: () => {
      toast.error("Failed to update driver");
    },
  });

  // Delete Driver
  const deleteDriverMutation = useMutation({
    mutationFn: deleteDriver,
    onSuccess: (_, deletedDriverId) => {
      queryClient.setQueryData(['drivers'], (oldDrivers: IDriver[] = []) =>
        oldDrivers.filter(driver => driver._id !== deletedDriverId)
      );
      queryClient.invalidateQueries({ queryKey: ['buses'] });
      toast.success("Driver deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete driver");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "", phone: "" });
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSuccess?: () => void
  ) => {
    e.preventDefault();
    await createDriverMutation.mutateAsync(formData);
    resetForm();
    if (onSuccess) onSuccess();
  };

  return {
    drivers,
    loading: isLoading,
    error,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    resetForm,
    fetchDrivers: refetchDrivers,
    updateExistingDriver: (id: string, data: { name: string; phone: string }) =>
      updateDriverMutation.mutateAsync({ id, data }),
    removeDriver: (id: string) => deleteDriverMutation.mutateAsync(id),
    
    isCreating: createDriverMutation.isPending,
    isUpdating: updateDriverMutation.isPending,
    isDeleting: deleteDriverMutation.isPending,
  };
};