import { useState } from "react";

const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [textType, setTextType] = useState("");

  const showToast = (message, type) => {
    setIsOpen(true);
    setText(message);
    setTextType(type);
  };

  return {
    showToast,
    isOpen,
    setIsOpen,
    text,
    setText,
    textType,
    setTextType,
  };
};

export default useToast;
