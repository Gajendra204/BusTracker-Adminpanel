import { useEffect, useState } from "react";
import { getAllBuses,  createBus, deleteBus, updateBus } from "../api/buses";
import { getAllDrivers } from "../api/drivers";

import toast from "react-hot-toast";

export const useBuses = () => {
  const [buses, setBuses] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    capacity: "",
    driverId: "",
  });

  useEffect(() => {
    fetchBuses();
    fetchDrivers();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const res = await getAllBuses();
      setBuses(res.data || []);
      console.log(res);
    } catch (err) {
      toast.error("Failed to fetch buses");
    }
    setLoading(false);
  };

  const fetchDrivers = async () => {
    try {
      const res = await getAllDrivers();
      setDrivers(res.data || []);
    } catch {
      toast.error("Failed to fetch drivers");
    }
  };

  const updateExistingBus = async (id: string, data: Partial<typeof formData>) => {
  try {
    await updateBus(id, {
      name: data.name,
      busNumber: data.number,
      capacity: Number(data.capacity),
      driverId: data.driverId 
    });
    toast.success("Bus updated successfully");
    await fetchBuses();
    return true;
  } catch (err) {
    toast.error("Failed to update bus");
    return false;
  }
};

const removeBus = async (id: string) => {
  try {
    await deleteBus(id);
    toast.success("Bus deleted successfully");
    fetchBuses();
    return true;
  } catch (err) {
    toast.error("Failed to delete bus");
    return false;
  }
};


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBus({
        name: formData.name,
        busNumber: formData.number,
        capacity: Number(formData.capacity),
        driverId: formData.driverId,
      });
      toast.success("Bus added successfully");
      resetForm();
      fetchBuses();
      return true;
    } catch (err) {
      toast.error("Failed to add bus. Please try again.");
      return false;
    }
  };

  const resetForm = () => {
    setFormData({ name: "", number: "", capacity: "", driverId: "" });
  };

  return {
    buses,
    drivers,
    loading,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    resetForm,
    fetchBuses,
    updateExistingBus,
  removeBus
  };
};
