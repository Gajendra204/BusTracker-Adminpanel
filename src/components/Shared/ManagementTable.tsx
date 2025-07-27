import { Edit, Trash2 } from "lucide-react";
import React from "react";

interface Column<T> {
  label: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface ManagementTableProps<T> {
  columns: Column<T>[];
  items: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
  emptyText?: string;
}

function ManagementTable<T extends { _id: string }>({
  columns,
  items,
  onEdit,
  onDelete,
  loading,
  emptyText = "No items found.",
}: ManagementTableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={
                  col.className ||
                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                }
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                {emptyText}
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                {columns.map((col, idx) => (
                  <td
                    key={idx}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {col.render(item)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="text-gray-600 hover:text-gray-900 mr-3 transition-colors"
                          aria-label="Edit"
                        >
                          <Edit className="w-4 h-4"/>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="text-red-600 hover:text-red-900"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManagementTable;
