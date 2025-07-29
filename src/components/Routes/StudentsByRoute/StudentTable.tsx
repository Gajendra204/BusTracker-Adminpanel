import ManagementTable from "../../Shared/ManagementTable";
import type { IStudent } from "../../../api/types";

interface Props {
  students: IStudent[];
  onDelete: (student: IStudent) => void;
  onEdit?: (student: IStudent) => void;
  loading?: boolean;
}

const StudentTable = ({ students, onDelete, onEdit, loading }: Props) => {
  const columns = [
    { label: "Name", render: (student: IStudent) => student.name },
    { label: "Class", render: (student: IStudent) => `Class ${student.class}` },
    { label: "Parent", render: (student: IStudent) => student.parentName },
    { label: "Phone", render: (student: IStudent) => student.parentPhone },
    {
      label: "Pickup Location",
      render: (student: IStudent) => student.pickupLocation,
    },
    {
      label: "Dropoff Location",
      render: (student: IStudent) => student.dropoffLocation,
    },
  ];

  return (
    <ManagementTable
      columns={columns}
      items={students}
      loading={loading}
      onEdit={onEdit}
      onDelete={onDelete}
      emptyText="No students found for this route"
    />
  );
};

export default StudentTable;
