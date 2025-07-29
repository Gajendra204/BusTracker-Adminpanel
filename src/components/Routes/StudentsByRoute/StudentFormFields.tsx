interface Props {
  formData: any;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

const StudentFormFields = ({ formData, errors, handleChange }: Props) => (
  <>
    {[
      { name: "name", label: "Student Name", type: "text" },
      { name: "parentName", label: "Parent Name", type: "text" },
      {
        name: "parentPhone",
        label: "Parent Phone",
        type: "tel",
        maxLength: 10,
      },
      { name: "pickupLocation", label: "Pickup Location", type: "text" },
      { name: "dropoffLocation", label: "Dropoff Location", type: "text" },
    ].map(({ name, label, type, maxLength }) => (
      <div key={name}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} *
        </label>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          maxLength={maxLength}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors[name] ? "border-red-500" : ""
          }`}
        />
        {errors[name] && (
          <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
        )}
      </div>
    ))}

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Class *
      </label>
      <select
        name="class"
        value={formData.class}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      >
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            Class {i + 1}
          </option>
        ))}
      </select>
    </div>
  </>
);

export default StudentFormFields;
