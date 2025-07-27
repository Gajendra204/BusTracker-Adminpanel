import { useState } from "react";
import { Plus } from "lucide-react";
import { MapLocationPicker } from "../../MapLocationPicker/MapLocationPicker";

interface RouteFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => Promise<void>;
}

const RouteForm = ({ onCancel, onSubmit }: RouteFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    stops: [{ name: "", location: { lat: 0, lng: 0 }, order: 0 }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStopChange = (index: number, field: string, value: string) => {
    const updatedStops = [...formData.stops];
    if (field === "lat" || field === "lng") {
      updatedStops[index].location = {
        ...updatedStops[index].location,
        [field]: parseFloat(value),
      };
    } else {
      updatedStops[index] = {
        ...updatedStops[index],
        [field]: field === "order" ? parseInt(value) : value,
      };
    }
    setFormData({ ...formData, stops: updatedStops });
  };

  const addStop = () => {
    setFormData({
      ...formData,
      stops: [
        ...formData.stops,
        {
          name: "",
          location: { lat: 0, lng: 0 },
          order: formData.stops.length,
        },
      ],
    });
  };

  const removeStop = (index: number) => {
    const updatedStops = formData.stops.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      stops: updatedStops.map((stop, i) => ({ ...stop, order: i })),
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      name: "",
      stops: [{ name: "", location: { lat: 0, lng: 0 }, order: 0 }],
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">Add New Route</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter route name"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          {formData.stops.map((stop, index) => (
            <div key={index} className="border p-4 rounded space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Stop {index + 1}</h3>
                {formData.stops.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 text-sm"
                    onClick={() => removeStop(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Stop Name"
                value={stop.name}
                onChange={(e) =>
                  handleStopChange(index, "name", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <MapLocationPicker
                onLocationSelect={(lat, lng) => {
                  handleStopChange(index, "lat", lat.toString());
                  handleStopChange(index, "lng", lng.toString());
                }}
                initialPosition={[
                  stop.location.lat || 28.5339,
                  stop.location.lng || 77.2111,
                ]}
              />
              <input
                type="number"
                value={stop.order}
                onChange={(e) =>
                  handleStopChange(index, "order", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-lg"
                required
                min={0}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addStop}
            className="text-sm flex items-center text-gray-700"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Stop
          </button>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg"
            >
              Add Route
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteForm;
