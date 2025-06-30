import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import Button from "../Shared/Button";

const Buses = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buses Management</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add New Bus
        </Button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Bus</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bus Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Enter bus name"
                  required                
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bus Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Enter bus number"
                  required                 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Enter capacity"
                  required                  
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Driver
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  required               
                >
                  <option value="">Select a driver</option>
                  <option value="Ram">Ram</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200"
                >
                  Add Bus
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bus Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bus Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Chambal
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                41
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                40
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Ram
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-gray-400 cursor-not-allowed mr-3"
                  disabled
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-300 cursor-not-allowed" disabled>
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Yamuna
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                42
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                35
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Shyam
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-gray-400 cursor-not-allowed mr-3"
                  disabled
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-300 cursor-not-allowed" disabled>
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Narmada
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                22
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                45
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Ghanshyam
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-gray-400 cursor-not-allowed mr-3"
                  disabled
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-300 cursor-not-allowed" disabled>
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buses;
