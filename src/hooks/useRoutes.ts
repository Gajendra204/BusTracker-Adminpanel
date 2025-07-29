import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
  assignBusToRoute,
} from "../api/routes";
import {
  type IRoute,
  type CreateRouteData,
  type UpdateRouteData,
  type AssignBusData
} from "../api/types";
import toast from "react-hot-toast";

export const useRoutes = () => {
  const queryClient = useQueryClient();
  const [currentRoute, setCurrentRoute] = useState<IRoute | null>(null);

  // Fetch All Routes 
  const {
    data: routes = [],
    isLoading,
    error,
    refetch: refetchRoutes
  } = useQuery({
    queryKey: ['routes'],
    queryFn: async () => {
      const response = await getAllRoutes();
      return response.data || [];
    },
  });

  //Fetch Single Route by ID
  const fetchRouteById = async (id: string) => {
    try {
      const response = await getRouteById(id);
      setCurrentRoute(response.data);
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch route");
      throw error;
    }
  };

  // Create Route
  const createRouteMutation = useMutation({
    mutationFn: createRoute,
    onSuccess: (newRoute) => {
      queryClient.setQueryData(['routes'], (oldRoutes: IRoute[] = []) => [
        ...oldRoutes,
        newRoute.data
      ]);
      toast.success("Route created successfully");
    },
    onError: () => {
      toast.error("Failed to create route");
    },
  });

  // Update Route
  const updateRouteMutation = useMutation({
    mutationFn: ({ id, routeData }: { id: string; routeData: UpdateRouteData }) =>
      updateRoute(id, routeData),
    onSuccess: (updatedRoute, variables) => {
      queryClient.setQueryData(['routes'], (oldRoutes: IRoute[] = []) =>
        oldRoutes.map(route => route._id === variables.id ? updatedRoute.data : route)
      );
      toast.success("Route updated successfully");
    },
    onError: () => {
      toast.error("Failed to update route");
    },
  });

  // Delete Route
  const deleteRouteMutation = useMutation({
    mutationFn: deleteRoute,
    onSuccess: (_, deletedRouteId) => {
      queryClient.setQueryData(['routes'], (oldRoutes: IRoute[] = []) =>
        oldRoutes.filter(route => route._id !== deletedRouteId)
      );
      toast.success("Route deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete route");
    },
  });

  // Assign Bus to Route
  const assignBusMutation = useMutation({
    mutationFn: ({ routeId, busData }: { routeId: string; busData: AssignBusData }) =>
      assignBusToRoute(routeId, busData),
    onSuccess: (updatedRoute, variables) => {
      queryClient.setQueryData(['routes'], (oldRoutes: IRoute[] = []) =>
        oldRoutes.map(route => route._id === variables.routeId ? updatedRoute.data : route)
      );
      toast.success("Bus assigned to route successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to assign bus to route");
    },
  });

  return {
    routes,
    currentRoute,   
    isLoading,
    error,
    
    // Actions
    fetchRoutes: refetchRoutes,
    fetchRouteById,
    setCurrentRoute,
    
    // Mutations
    addRoute: (routeData: CreateRouteData) => 
      createRouteMutation.mutateAsync(routeData),
    modifyRoute: (id: string, routeData: UpdateRouteData) =>
      updateRouteMutation.mutateAsync({ id, routeData }),
    removeRoute: (id: string) => deleteRouteMutation.mutateAsync(id),
    assignBus: (routeId: string, busData: AssignBusData) =>
      assignBusMutation.mutateAsync({ routeId, busData }),
    
    // Mutation states
    isCreating: createRouteMutation.isPending,
    isUpdating: updateRouteMutation.isPending,
    isDeleting: deleteRouteMutation.isPending,
    isAssigning: assignBusMutation.isPending,
  };
};