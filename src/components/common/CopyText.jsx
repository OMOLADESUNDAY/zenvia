import { Copy } from "lucide-react";
const CopyText = ({ text ,setCopied}) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied('copied')
    setTimeout(()=>{
       setCopied('')
    },1000)
   
  };

  return (
    <button onClick={copyToClipboard} className="cursor-pointer">
        <small className=""> <Copy size={14} /></small>
    </button>
  );
};

export default CopyText;
