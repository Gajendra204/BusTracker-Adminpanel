import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { FormInput } from "../Shared/FormInput";
import { ModalActions } from "../Shared/ModalActions";
import { useDrivers } from "../../hooks/useDrivers";

const Drivers = () => {
  const {
    drivers,
    loading,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    updateExistingDriver,
    removeDriver,
    resetForm,
  } = useDrivers();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState<null | any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState<null | string>(null);

  const handleEditClick = (driver: any) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      phone: driver.phone,
    });
    setShowAddForm(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDriver) {
      const success = await updateExistingDriver(editingDriver._id, formData);
      if (success) {
        setEditingDriver(null);
        setShowAddForm(false);
        resetForm();
      }
    }
  };

  const handleDeleteClick = (driverId: string) => {
    setDriverToDelete(driverId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (driverToDelete) {
      await removeDriver(driverToDelete);
      setShowDeleteConfirm(false);
      setDriverToDelete(null);
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Drivers Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Driver
        </button>
      </div>

      {showAddForm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-95"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingDriver ? "Edit Driver" : "Add New Driver"}
            </h2>
            <form
              onSubmit={editingDriver ? handleUpdateSubmit : handleSubmit}
              className="space-y-4"
            >
              <FormInput
                label="Driver Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter driver name"
                required
              />

              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />

              <ModalActions
                submitText={editingDriver ? "Update Driver" : "Add Driver"}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingDriver(null);
                  resetForm();
                }}
              />
            </form>
          </div>
        </div>
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

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : drivers.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No drivers found.
                </td>
              </tr>
            ) : (
              drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {driver.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {driver.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(driver)}
                      className="text-gray-600 hover:text-gray-900 mr-3"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(driver._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

export default Drivers;
