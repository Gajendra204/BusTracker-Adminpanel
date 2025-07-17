import { Edit, Trash2 } from "lucide-react";
import Button from "../Shared/Button";

interface RouteRowProps {
  route: any;
  buses: any[];
  selectedBus: string;
  onBusSelect: (busId: string) => void;
  onAssign: () => void;
  onDelete: () => void;
}

const RouteRow = ({
  route,
  buses,
  selectedBus,
  onBusSelect,
  onAssign,
  onDelete,
}: RouteRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900">{route.name}</td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {route.stops.map((stop:any, i:any) => (
          <div key={i}>
            {i + 1}. {stop.name} ({stop.location.lat.toFixed(4)}, {stop.location.lng.toFixed(4)})
          </div>
        ))}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <select
            value={selectedBus}
            onChange={(e) => onBusSelect(e.target.value)}
            className="border rounded p-1 text-sm"
          >
            <option value="">Select Bus</option>
            {buses.map((bus) => (
              <option key={bus._id} value={bus._id}>
                {bus.name} ({bus.busNumber})
              </option>
            ))}
          </select>
          {selectedBus && <Button onClick={onAssign}>Assign</Button>}
        </div>
        {!selectedBus && route.busId && (
          <div className="mt-1 text-xs">
            Currently: {route.busId.name} ({route.busId.busNumber})
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-sm">
        <button className="text-gray-600 hover:text-gray-900 mr-3">
          <Edit className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="text-red-600 hover:text-red-900">
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default RouteRow;
