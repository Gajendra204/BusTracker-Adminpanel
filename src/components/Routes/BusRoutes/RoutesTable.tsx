import React from "react";
import RouteRow from "./RouteRow";

interface RoutesTableProps {
  routes: any[];
  buses: any[];
  drivers: any[];
  selectedBusForRoute: { [routeId: string]: string };
  selectedDriverForRoute: { [routeId: string]: string };
  onBusSelect: (routeId: string, busId: string) => void;
  onDriverChange: (routeId: string, busId: string, driverId: string) => void;
  onAssign: (routeId: string) => void;
  onDelete: (routeId: string) => void;
  assignBus: (routeId: string, data: { busId: string }) => Promise<any>;
  assignDriver: (busId: string, driverId: string) => Promise<any>;
  loading?: boolean;
}

const RoutesTable: React.FC<RoutesTableProps> = ({
  routes,
  buses,
  drivers,
  selectedBusForRoute,
  selectedDriverForRoute,
  onBusSelect,
  onDriverChange,
  onAssign,
  onDelete,
  assignBus,
  assignDriver,
  loading,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md ">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Route Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stops
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned Bus
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Loading routes...
              </td>
            </tr>
          ) : routes?.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No routes found
              </td>
            </tr>
          ) : (
            routes?.map((route) => (
              <RouteRow
                key={route._id}
                route={route}
                buses={buses}
                drivers={drivers}
                selectedBus={selectedBusForRoute[route._id] || ""}
                selectedDriver={selectedDriverForRoute[route._id] || ""}
                onBusSelect={(busId) => onBusSelect(route._id, busId)}
                onDriverChange={(driverId) =>
                  onDriverChange(
                    route._id,
                    selectedBusForRoute[route._id],
                    driverId
                  )
                }
                onAssign={() => onAssign(route._id)}
                onDelete={() => onDelete(route._id)}
                assignBus={assignBus}
                assignDriver={assignDriver}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoutesTable;
