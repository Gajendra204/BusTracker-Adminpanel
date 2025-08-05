import {
  Users,
  MapPin,
  Settings,
  Edit,
  Trash,
  MoreVertical,
  MoreHorizontal,
  EllipsisVertical,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import RouteManageModal from "./RouteManageModal";

interface RouteRowProps {
  route: any;
  buses: any[];
  drivers: any[];
  selectedBus: string;
  selectedDriver: string;
  onBusSelect: (busId: string) => void;
  onDriverChange: (driverId: string) => void;
  onAssign: () => void;
  onDelete: () => void;
  assignBus: (routeId: string, data: { busId: string }) => Promise<any>;
  assignDriver: (busId: string, driverId: string) => Promise<any>;
}

const RouteRow = ({
  route,
  buses,
  drivers,
  selectedBus,
  selectedDriver,
  onDelete,
  assignBus,
  assignDriver,
}: RouteRowProps) => {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalBus, setModalBus] = useState(selectedBus);
  const [modalDriver, setModalDriver] = useState(selectedDriver);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleManageClick = () => {
    setModalBus(selectedBus);
    setModalDriver(selectedDriver);
    setIsManageModalOpen(true);
  };

  const handleRouteEdit = () => {
    setIsRouteModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete();
    setIsDropdownOpen(false);
  };

  const handleManageModalSave = async () => {
    // Assign the bus to the route if changed
    if (modalBus !== selectedBus) {
      await assignBus(route._id, { busId: modalBus });
    }
    // Assign the driver to the selected bus
    if (modalBus && modalDriver) {
      await assignDriver(modalBus, modalDriver);
    }
    setIsManageModalOpen(false);
  };

  const handleManageModalCancel = () => {
    setIsManageModalOpen(false);
  };

  const currentBus = buses.find((b) => b._id === selectedBus) || route.busId;
  const currentDriver = drivers.find((d) => d._id === selectedDriver);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 font-medium text-gray-900">{route.name}</td>
        <td
          className="px-6 py-4 text-sm text-gray-500 cursor-pointer"
          onClick={() => setExpanded((prev) => !prev)}
          title="Click to expand/collapse stops"
        >
          {(() => {
            const stops = route.stops.map((stop: any) => stop.name);
            const previewStops = stops.slice(0, 2).join(", ");
            const moreCount = stops.length - 2;
            const stopsPreview =
              moreCount > 0
                ? `${previewStops} +${moreCount} more`
                : previewStops;
            return <span>{stopsPreview}</span>;
          })()}
          <span className="ml-2 text-xs text-gray-700">
            {expanded ? "▲" : "▼"}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          <div>
            <div>
              <span className="font-semibold">Bus:</span>{" "}
              {currentBus?.name
                ? `${currentBus.name} (${currentBus.busNumber})`
                : "-"}
            </div>
            <div>
              <span className="font-semibold">Driver:</span>{" "}
              {currentDriver?.name || "-"}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm">
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded text-sm"
              onClick={() => setIsDropdownOpen((open) => !open)}
              aria-label="Actions"
            >
              <EllipsisVertical className="w-5 h-5" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-90">
                <Link
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  to={`/routes/${route._id}/students`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  View Students
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    handleManageClick();
                    setIsDropdownOpen(false);
                  }}
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  Manage Assignments
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    handleRouteEdit();
                    setIsDropdownOpen(false);
                  }}
                >
                  <Edit className="w-4 h-4 inline mr-2" />
                  Edit Route
                </button>
                <hr className="my-1" />
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    handleDeleteClick();
                    setIsDropdownOpen(false);
                  }}
                >
                  <Trash className="w-4 h-4 inline mr-2" />
                  Delete Route
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td
            colSpan={4}
            className="bg-gray-200 px-8 py-4 border-l-4 border-gray-700"
          >
            <div>
              <span className="font-semibold text-gray-700">All Stops:</span>
              <ul className="list-none ml-0 mt-2">
                {route.stops.map((stop: any, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center mb-1 text-gray-900"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-gray-700" />
                    <span>{stop.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </td>
        </tr>
      )}
      {isManageModalOpen &&
        ReactDOM.createPortal(
          <RouteManageModal
            isOpen={isManageModalOpen}
            buses={buses}
            drivers={drivers}
            modalBus={modalBus}
            modalDriver={modalDriver}
            setModalBus={setModalBus}
            setModalDriver={setModalDriver}
            onCancel={handleManageModalCancel}
            onSave={handleManageModalSave}
          />,
          document.body
        )}
    </>
  );
};

export default RouteRow;
