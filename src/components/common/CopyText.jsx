import { Copy } from "lucide-react";
const CopyText = ({ text }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <button onClick={copyToClipboard} className="cursor-pointer">
        <small className=""> <Copy size={14} /></small>
    </button>
  );
};

export default CopyText;
