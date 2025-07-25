interface Props {
    selectedClass: number | "";
    onChange: (value: number | "") => void;
  }
  
  const ClassFilterDropdown = ({ selectedClass, onChange }: Props) => {
    return (
      <div className="mb-6 w-full md:w-1/3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Class
        </label>
        <select
          value={selectedClass}
          onChange={(e) =>
            onChange(e.target.value ? parseInt(e.target.value) : "")
          }
          className="w-full p-2 border rounded-md"
        >
          <option value="">All Classes</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Class {i + 1}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default ClassFilterDropdown;
  