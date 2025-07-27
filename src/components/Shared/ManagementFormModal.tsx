import React from "react";
import { ModalActions } from "./ModalActions";

interface Field {
  label: string;
  name: string;
  type?: string;
  value?: any;
  options?: { _id: string; name: string }[];
  required?: boolean;
  placeholder?: string;
}

interface ManagementFormModalProps {
  open: boolean;
  title: string;
  fields: Field[];
  formData: Record<string, any>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitText: string;
  cancelText?: string;
  editingItem?: any;
}

const ManagementFormModal: React.FC<ManagementFormModalProps> = ({
  open,
  title,
  fields,
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitText,
  cancelText = "Cancel",
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((field) =>
            field.type === "select" ? (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={onChange}
                  className="w-full p-2 border rounded-md"
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt._id} value={opt._id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  className="w-full p-2 border rounded-md"
                  required={field.required}
                />
              </div>
            )
          )}
          <ModalActions
            submitText={submitText}
            cancelText={cancelText}
            onCancel={onCancel}
          />
        </form>
      </div>
    </div>
  );
};

export default ManagementFormModal;
