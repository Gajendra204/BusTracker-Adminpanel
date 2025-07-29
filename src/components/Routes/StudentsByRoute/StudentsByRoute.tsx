import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { useStudents, useStudentsByRoute } from "../../../hooks/useStudents";
import { useRoutes } from "../../../hooks/useRoutes";
import Button from "../../Shared/Button";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import ClassFilterDropdown from "./ClassFilterDropdown";
import DeleteConfirmationModal from "../../Shared/DeleteConfirmationModal";
import type { IStudent } from "../../../api/types";

const StudentsByRoute = () => {
  const { routeId } = useParams();
  const { routes } = useRoutes();
  const { addStudent, deleteStudent } = useStudents();
  const [selectedClass, setSelectedClass] = useState<number | "">("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { students, isLoading, error, refetch } = useStudentsByRoute(
    routeId!,
    selectedClass || undefined
  );

  const currentRoute = routes?.find((r: any) => r._id === routeId);

  const handleAddStudent = async (studentData: any) => {
    if (!routeId) return;
    await addStudent(routeId, { ...studentData, routeId });
    setShowAddForm(false);
    refetch();
  };

  const handleDeleteStudent = async () => {
    if (studentToDelete) {
      await deleteStudent(studentToDelete);
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
      refetch();
    }
  };

  if (!routeId) return <div>Route ID not provided</div>;
  if (isLoading) return <div>Loading students...</div>;
  if (error)
    return (
      <div className="text-red-500">
        {typeof error === "object" && error !== null && "message" in error
          ? error.message
          : error}
      </div>
    );
  if (!routes || routes.length === 0) return <div>Loading routes...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Students for Route: {currentRoute?.name || "Unknown Route"}
          </h1>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Student
        </Button>
      </div>

      <ClassFilterDropdown
        selectedClass={selectedClass}
        onChange={setSelectedClass}
      />

      {showAddForm && (
        <StudentForm
          onCancel={() => setShowAddForm(false)}
          onSubmit={handleAddStudent}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteStudent}
      />

      <StudentTable
        students={students}
        loading={isLoading}
        onDelete={(student: IStudent) => {
          if (student && student._id) {
            setStudentToDelete(student._id);
            setShowDeleteConfirm(true);
          }
        }}
      />
    </div>
  );
};

export default StudentsByRoute;
