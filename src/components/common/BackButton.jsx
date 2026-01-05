import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
    >
      ← Back
    </button>
  );
};

export default BackButton;
