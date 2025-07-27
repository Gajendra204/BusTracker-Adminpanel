import React from "react";
import { ModalActions } from "../../Shared/ModalActions";

interface RouteManageModalProps {
  isOpen: boolean;
  buses: any[];
  drivers: any[];
  modalBus: string;
  modalDriver: string;
  setModalBus: (busId: string) => void;
  setModalDriver: (driverId: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const RouteManageModal: React.FC<RouteManageModalProps> = ({
  isOpen,
  buses,
  drivers,
  modalBus,
  modalDriver,
  setModalBus,
  setModalDriver,
  onCancel,
  onSave,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Manage Route Assignment</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bus
          </label>
          <select
            value={modalBus}
            onChange={(e) => setModalBus(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Bus</option>
            {buses.map((bus) => (
              <option key={bus._id} value={bus._id}>
                {bus.name} ({bus.busNumber})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Driver
          </label>
          <select
            value={modalDriver}
            onChange={(e) => setModalDriver(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={!modalBus}
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>
        <ModalActions
          submitText="Save Assignment"
          cancelText="Cancel"
          onCancel={onCancel}
          onSubmit={onSave}
        />
      </div>
    </div>
  );
};

export default RouteManageModal;
