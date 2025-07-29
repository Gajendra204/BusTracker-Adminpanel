import { useState } from "react";
import { Loader2 } from "lucide-react";
import StudentFormFields from "./StudentFormFields";
import { useStudentForm } from "./useStudentForm";

interface StudentFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => Promise<void>;
}

const StudentForm = ({ onCancel, onSubmit }: StudentFormProps) => {
  const { formData, errors, handleChange, validateForm } = useStudentForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100]  bg-opacity-70"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <StudentFormFields
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Add Student"
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
