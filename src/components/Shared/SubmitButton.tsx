import { Loader } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
}

const SubmitButton = ({ isLoading, text }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-gray-800 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-900 transform hover:scale-[1.02] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin mr-2 w-5 h-5 text-white" />
        {text}...
      </div>
    ) : (
      text
    )}
  </button>
);

export default SubmitButton;
