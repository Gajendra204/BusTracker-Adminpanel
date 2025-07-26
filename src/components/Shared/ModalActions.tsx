type ModalActionsProps = {
  submitText?: string;
  cancelText?: string;
  onCancel: () => void;
  onSubmit?: () => void;
};

export const ModalActions = ({
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  onSubmit,
}: ModalActionsProps) => (
  <div className="flex space-x-3 pt-4">
    <button
      type={onSubmit ? "button" : "submit"}
      className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200 disabled:opacity-50"
      onClick={onSubmit}
    >
      {submitText}
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
    >
      {cancelText}
    </button>
  </div>
);
