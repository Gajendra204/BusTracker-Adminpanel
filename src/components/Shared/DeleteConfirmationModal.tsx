interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-80">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this student?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
