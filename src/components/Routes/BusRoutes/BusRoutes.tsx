import { useState } from "react";
import { Plus } from "lucide-react";
import { useRoutes } from "../../../hooks/useRoutes";
import { useBuses } from "../../../hooks/useBuses";
import Button from "../../Shared/Button";
import RouteForm from "./RouteForm";
import DeleteConfirmationModal from "../../Shared/DeleteConfirmationModal";
import { useRouteAssignments } from "../../../hooks/useRouteAssignments";
import RoutesTable from "./RoutesTable";

const BusRoutes = () => {
  const { routes, isLoading, error, addRoute, removeRoute, assignBus } =
    useRoutes();
  const { buses, drivers, assignDriver } = useBuses();

  const [showAddForm, setShowAddForm] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<null | string>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    selectedBusForRoute,
    selectedDriverForRoute,
    handleBusSelect,
    handleDriverChange,
  } = useRouteAssignments(routes, buses);

  const handleCreateRoute = async (formData: any) => {
    try {
      await addRoute(formData);
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to add route:", err);
    }
  };

  const handleAssign = async (routeId: string) => {
    const busId = selectedBusForRoute[routeId];
    if (busId) {
      try {
        await assignBus(routeId, { busId });
      } catch (err) {
        console.error("Failed to assign bus:", err);
      }
    }
  };

  const handleDelete = async (routeId: string) => {
    setRouteToDelete(routeId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (routeToDelete) {
      await removeRoute(routeToDelete);
      setShowDeleteConfirm(false);
      setRouteToDelete(null);
    }
  };

  const onBusSelect = (routeId: string, busId: string) => {
    handleBusSelect(routeId, busId);
  };

  const onDriverChange = async (
    routeId: string,
    busId: string,
    driverId: string
  ) => {
    handleDriverChange(routeId, driverId);
    if (busId && driverId) {
      await assignDriver(busId, driverId);
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Routes Management</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-5 h-5 mr-2" /> Add New Route
        </Button>
      </div>

      {showAddForm && (
        <RouteForm
          onCancel={() => setShowAddForm(false)}
          onSubmit={handleCreateRoute}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
      />

      {isLoading ? (
        <p>Loading routes...</p>
      ) : error ? (
        <p className="text-red-500">
          {typeof error === "object" && error !== null && "message" in error
            ? error.message
            : error}
        </p>
      ) : (
        <RoutesTable
          routes={routes}
          buses={buses}
          drivers={drivers}
          selectedBusForRoute={selectedBusForRoute}
          selectedDriverForRoute={selectedDriverForRoute}
          onBusSelect={onBusSelect}
          onDriverChange={onDriverChange}
          onAssign={handleAssign}
          onDelete={handleDelete}
          assignBus={assignBus}
          assignDriver={assignDriver}
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default BusRoutes;
