import ManagementTable from "../../Shared/ManagementTable";

interface Props {
  students: any[];
  onDelete: (id: string) => void;
  onEdit?: (student: any) => void;
  loading?: boolean;
}

const StudentTable = ({ students, onDelete, onEdit, loading }: Props) => {
  const columns = [
    { label: "Name", render: (student: any) => student.name },
    { label: "Class", render: (student: any) => `Class ${student.class}` },
    { label: "Parent", render: (student: any) => student.parentName },
    { label: "Phone", render: (student: any) => student.parentPhone },
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
