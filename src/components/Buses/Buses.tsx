import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import Button from "../Shared/Button";
import { FormInput } from "../Shared/FormInput";
import { FormSelect } from "../Shared/FormSelect";
import { ModalActions } from "../Shared/ModalActions";
import { useBuses } from "../../hooks/useBuses";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";
const Buses = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    buses,
    drivers,
    loading,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    resetForm,
    updateExistingBus,
    removeBus,
  } = useBuses();
  const [editingBus, setEditingBus] = useState<null | any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [busToDelete, setBusToDelete] = useState<null | string>(null);

  const handleEditClick = (bus: any) => {
    setEditingBus(bus);
    setFormData({
      name: bus.name,
      number: bus.busNumber,
      capacity: bus.capacity.toString(),
      driverId: bus.assignedDriver?._id || "",
    });
    setShowAddForm(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBus) {
      const success = await updateExistingBus(editingBus._id, formData);
      if (success) {
        setEditingBus(null);
        setShowAddForm(false);
        resetForm();
      }
    }
  };

  const handleDeleteClick = (busId: string) => {
    setBusToDelete(busId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (busToDelete) {
      await removeBus(busToDelete);
      setShowDeleteConfirm(false);
      setBusToDelete(null);
    }
  };
  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Buses Management</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add New Bus
        </Button>
      </div>

      {showAddForm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-95"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingBus ? "Edit Bus" : "Add New Bus"}
            </h2>
            <form onSubmit={editingBus ? handleUpdateSubmit : handleSubmit}>
              <FormInput
                label="Bus Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Bus Number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
              <FormSelect
                label="Select Driver"
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
                options={[
                  ...drivers.map((driver) => ({
                    _id: driver._id,
                    name: driver.name,
                  })),
                ]}
                required
              />
              <ModalActions
                submitText={editingBus ? "Update Bus" : "Add Bus"}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingBus(null);
                  resetForm();
                }}
              />
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bus Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bus Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading buses...
                </td>
              </tr>
            ) : buses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No buses found
                </td>
              </tr>
            ) : (
              buses.map((bus) => (
                <tr key={bus._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bus.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bus.busNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bus.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bus.assignedDriver ? bus.assignedDriver.name : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditClick(bus)}
                        className="text-gray-600 hover:text-gray-900 mr-3 transition-colors"
                        aria-label="Edit bus"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(bus._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buses;
