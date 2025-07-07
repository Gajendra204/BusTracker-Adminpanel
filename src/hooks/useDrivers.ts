import { useState, useEffect } from "react";
import { getAllDrivers, createDriver } from "../api";
import toast from "react-hot-toast";

export const useDrivers = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  

  const fetchDrivers = async () => {
    setLoading(true);
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

  const addDriver = async (data: { name: string; phone: string }) => {
    try {
      await createDriver(data);
      await fetchDrivers();
    } catch (err) {
      toast.error("Error creating driver");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return { drivers, loading, fetchDrivers, addDriver };
};
