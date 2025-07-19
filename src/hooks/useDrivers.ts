import { useState, useEffect } from "react";
import { getAllDrivers, createDriver, deleteDriver, updateDriver } from "../api/drivers";
import toast from "react-hot-toast";

export const useDrivers = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ name: "", phone: "" });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);8
    try {
      const res = await getAllDrivers();
      setDrivers(res.data || []);
    } catch (err) {
      toast.error("Failed to load drivers");
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateExistingDriver = async (id: string, data: { name: string; phone: string }) => {
  try {
    await updateDriver(id, data);
    toast.success("Driver updated successfully");
    fetchDrivers();
    return true;
  } catch (err) {
    toast.error("Failed to update driver");
    return false;
  }
};

const removeDriver = async (id: string) => {
  try {
    await deleteDriver(id);
    toast.success("Driver deleted successfully");
    fetchDrivers();
    return true;
  } catch (err) {
    toast.error("Failed to delete driver");
    return false;
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "", phone: "" });
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSuccess?: () => void
  ) => {
    e.preventDefault();
    try {
      await createDriver(formData);
      toast.success("Driver added");
      resetForm();
      await fetchDrivers();
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Error creating driver");
    }
  };

  return {
    drivers,
    loading,
    fetchDrivers,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    resetForm,
    updateExistingDriver,
  removeDriver
  };
};
