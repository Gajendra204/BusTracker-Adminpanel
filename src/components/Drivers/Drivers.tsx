import { useState } from "react";
import { UserRoundPlus } from "lucide-react";
import { useDrivers } from "../../hooks/useDrivers";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";
import ManagementTable from "../Shared/ManagementTable";
import ManagementFormModal from "../Shared/ManagementFormModal";
import Button from "../Shared/Button";

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

  const handleDeleteClick = (driver: any) => {
    setDriverToDelete(driver._id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (driverToDelete) {
      await removeDriver(driverToDelete);
      setShowDeleteConfirm(false);
      setDriverToDelete(null);
    }
  };

  const columns = [
    { label: "Driver Name", render: (driver: any) => driver.name },
    { label: "Phone Number", render: (driver: any) => driver.phone },
  ];

  const fields = [
    { label: "Driver Name", name: "name", required: true },
    { label: "Phone Number", name: "phone", type: "tel", required: true },
  ];

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Drivers Management</h1>
        <Button
          onClick={() => {
            setShowAddForm(true);
            setEditingDriver(null);
            resetForm();
          }}
        >
          <UserRoundPlus className="w-5 h-5 mr-2" /> Add New Driver
        </Button>
      </div>

      <ManagementFormModal
        open={showAddForm}
        title={editingDriver ? "Edit Driver" : "Add New Driver"}
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={editingDriver ? handleUpdateSubmit : handleSubmit}
        onCancel={() => {
          setShowAddForm(false);
          setEditingDriver(null);
          resetForm();
        }}
        submitText={editingDriver ? "Update Driver" : "Add Driver"}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
      />

      <ManagementTable
        columns={columns}
        items={drivers}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        emptyText="No drivers found."
      />
    </div>
  );
};

export default Drivers;
