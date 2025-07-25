import { Edit, Trash2 } from "lucide-react";

interface Props {
  students: any[];
  onDelete: (id: string) => void;
}

const StudentTable = ({ students, onDelete }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">Class {student.class}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{student.parentName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{student.parentPhone}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="w-4 h-4 inline" />
                  </button>
                  <button
                    onClick={() => onDelete(student._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No students found for this route
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
