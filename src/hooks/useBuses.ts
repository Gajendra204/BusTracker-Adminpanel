import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllBuses, createBus, deleteBus, updateBus, assignDriverToBus } from "../api/buses";
import { getAllDrivers } from "../api/drivers";
import toast from "react-hot-toast";
import type { IBus} from "../api/types";

export const useBuses = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    capacity: "",
    driverId: "",
  });

  // Fetch Buses
  const {
    data: buses = [], 
    isLoading: busesLoading,
    error: busesError,
    refetch: refetchBuses
  } = useQuery({
    queryKey: ['buses'], 
    queryFn: async () => {
      const response = await getAllBuses();
      return response.data || [];
    }, 
  });

  // Fetch Drivers
  const {
    data: drivers = [],
    isLoading: driversLoading,
    error: driversError,
    refetch: refetchDrivers
  } = useQuery({
    queryKey: ['drivers'],
    queryFn: async () => {
      const response = await getAllDrivers();
      return response.data || [];
    },
  });

  // Create Bus
  const createBusMutation = useMutation({
    mutationFn: async (busData: {
      name: string;
      busNumber: string;
      capacity: number;
      driverId: string;
    }) => {
      const response = await createBus(busData);
      return response.data;
    },
    onSuccess: (newBus) => {
      queryClient.setQueryData(['buses'], (oldBuses: IBus[] = []) => [
        ...oldBuses,
        newBus
      ]);
      toast.success("Bus added successfully");
    },
    onError: () => {
      toast.error("Failed to add bus. Please try again.");
    },
  });

  // Update Bus
  const updateBusMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await updateBus(id, {
        name: data.name,
        busNumber: data.number,
        capacity: Number(data.capacity),
        driverId: data.driverId
      });
      return response.data;
    },
    onSuccess: (updatedBus, variables) => {
      queryClient.setQueryData(['buses'], (oldBuses: IBus[] = []) =>
        oldBuses.map(bus => bus._id === variables.id ? updatedBus : bus)
      );
      toast.success("Bus updated successfully");
    },
    onError: () => {
      toast.error("Failed to update bus");
    },
  });

  // Delete Bus
  const deleteBusMutation = useMutation({
    mutationFn: deleteBus,
    onSuccess: (_, deletedBusId) => {
      queryClient.setQueryData(['buses'], (oldBuses: IBus[] = []) =>
        oldBuses.filter(bus => bus._id !== deletedBusId)
      );
      toast.success("Bus deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete bus");
    },
  });

  // Assign Driver to Bus
  const assignDriverMutation = useMutation({
    mutationFn: assignDriverToBus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buses'] });
      toast.success("Driver assigned successfully");
    },
    onError: () => {
      toast.error("Failed to assign driver");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBusMutation.mutateAsync({
      name: formData.name,
      busNumber: formData.number,
      capacity: Number(formData.capacity),
      driverId: formData.driverId,
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", number: "", capacity: "", driverId: "" });
  };

  return {
    buses,
    drivers,
    loading: busesLoading || driversLoading,
    busesLoading,
    driversLoading,
    busesError,
    driversError,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    resetForm,
    fetchBuses: refetchBuses,
    fetchDrivers: refetchDrivers,
    updateExistingBus: (id: string, data: any) => 
      updateBusMutation.mutateAsync({ id, data }),
    removeBus: (id: string) => deleteBusMutation.mutateAsync(id),
    assignDriver: (busId: string, driverId: string) => 
      assignDriverMutation.mutateAsync({ busId, driverId }),
    
    isCreating: createBusMutation.isPending,
    isUpdating: updateBusMutation.isPending,
    isDeleting: deleteBusMutation.isPending,
    isAssigning: assignDriverMutation.isPending,
  };
};
