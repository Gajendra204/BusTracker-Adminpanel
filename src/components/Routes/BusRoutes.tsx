import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRoutes } from "../../hooks/useRoutes";
import { useBuses } from "../../hooks/useBuses";
import Button from "../Shared/Button";
import RouteForm from "./RouteForm";
import RouteRow from "./RouteRow";

const BusRoutes = () => {
  const {
    routes,
    isLoading,
    error,
    fetchRoutes,
    addRoute,
    removeRoute,
    assignBus,
  } = useRoutes();
  const { buses } = useBuses();

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBusForRoute, setSelectedBusForRoute] = useState<{
    [routeId: string]: string;
  }>({});
   const [routeToDelete, setRouteToDelete] = useState<null | string>(null);
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, []);

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
        fetchRoutes();
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

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Routes Management</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-5 h-5 mr-2" /> Add New Route
        </Button>
      </div>

      {showAddForm && (
        <RouteForm onCancel={() => setShowAddForm(false)} onSubmit={handleCreateRoute} />
      )}

        {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-95 bg-black bg-opacity-80">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this bus?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <p>Loading routes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Route Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stops
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Assigned Bus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routes?.map((route) => (
                <RouteRow
                  key={route._id}
                  route={route}
                  buses={buses}
                  selectedBus={selectedBusForRoute[route._id] || ""}
                  onBusSelect={(busId) =>
                    setSelectedBusForRoute((prev) => ({ ...prev, [route._id]: busId }))
                  }
                  onAssign={() => handleAssign(route._id)}
                  onDelete={() => handleDelete(route._id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BusRoutes;
