import type { ChangeEvent } from "react";

type FormSelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { _id: string; name: string }[];
  required?: boolean;
};

export const FormSelect = ({
  label,
  options,
  ...props
}: FormSelectProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      {...props}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);