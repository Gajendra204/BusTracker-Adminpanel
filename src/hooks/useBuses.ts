import { useEffect, useState } from "react";
import { getAllBuses, getAllDrivers, createBus } from "../api";
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
        number: formData.number,
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
    handleChange,
    handleSubmit,
    resetForm,
    fetchBuses,
  };
};
