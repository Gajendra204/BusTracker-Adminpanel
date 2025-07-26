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
}) => {
  return (
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutesTable;
