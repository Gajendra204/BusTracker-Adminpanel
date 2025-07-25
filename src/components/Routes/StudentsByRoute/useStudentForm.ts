import { useState } from "react";

export const useStudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    class: 1,
    parentName: "",
    parentPhone: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.parentName.trim()) newErrors.parentName = "Parent name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!validatePhone(formData.parentPhone)) newErrors.parentPhone = "Enter valid 10-digit phone";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "class" ? parseInt(value) : value,
    });
  };

  return { formData, errors, handleChange, validateForm };
};
