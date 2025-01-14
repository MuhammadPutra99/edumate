import React, { useState } from "react";

const InputForm = ({ setShowChat, setUserMessage }) => {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "" || isSubmitting) return;

    setIsSubmitting(true);
    setUserMessage(input.trim());
    setShowChat(true);
    setInput(""); 
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">What can I do for you?</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md"
      >
        <textarea
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send messages to MateAi"
          className="w-full px-4 py-2 mb-4 text-gray-900 rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className={`px-6 py-2 bg-blue-500 rounded-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default InputForm;
