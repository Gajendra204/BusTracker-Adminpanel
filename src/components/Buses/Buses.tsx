import { useState } from "react";
import { Plus } from "lucide-react";
import { useBuses } from "../../hooks/useBuses";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";
import ManagementTable from "../Shared/ManagementTable";
import ManagementFormModal from "../Shared/ManagementFormModal";
import Button from "../Shared/Button";

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

  const handleDeleteClick = (bus: any) => {
    setBusToDelete(bus._id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (busToDelete) {
      await removeBus(busToDelete);
      setShowDeleteConfirm(false);
      setBusToDelete(null);
    }
  };

  const columns = [
    { label: "Bus Name", render: (bus: any) => bus.name },
    { label: "Bus Number", render: (bus: any) => bus.busNumber },
    { label: "Capacity", render: (bus: any) => bus.capacity },
    {
      label: "Driver",
      render: (bus: any) =>
        bus.assignedDriver ? bus.assignedDriver.name : "-",
    },
  ];

  const fields = [
    { label: "Bus Name", name: "name", required: true },
    { label: "Bus Number", name: "number", required: true },
    { label: "Capacity", name: "capacity", type: "number", required: true },
    {
      label: "Select Driver",
      name: "driverId",
      type: "select",
      options: drivers,
      required: true,
    },
  ];

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Buses Management</h1>
        <Button
          onClick={() => {
            setShowAddForm(true);
            setEditingBus(null);
            resetForm();
          }}
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Bus
        </Button>
      </div>

      <ManagementFormModal
        open={showAddForm}
        title={editingBus ? "Edit Bus" : "Add New Bus"}
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={editingBus ? handleUpdateSubmit : handleSubmit}
        onCancel={() => {
          setShowAddForm(false);
          setEditingBus(null);
          resetForm();
        }}
        submitText={editingBus ? "Update Bus" : "Add Bus"}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
      />

      <ManagementTable
        columns={columns}
        items={buses}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        emptyText="No buses found"
      />
    </div>
  );
};

export default Buses;
