import React, { useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";

const InputForm = ({ setShowChat, setUserMessage }) => {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
    // Dynamically adjust the height of the textarea
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

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
    <div className="flex flex-col items-center justify-center text-white relative top-48 md:top-0 md:h-[80vh]">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">What can I do for you?</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md"
      >
        {/* UPDATE UPDATE UPDATE */}
        <div className="bg-gray-800 px-5 py-3 h-auto rounded-2xl">
          <textarea
            value={input}
            onChange={handleInput}
            placeholder="Send messages to Mate AI"
            className="montserrat bg-gray-800 w-[230px] md:w-[600px] text-sm md:text-xl rounded-md focus:outline-none placeholder:text-gray-500 placeholder:font-semibold"
            rows={1}
            style={{ overflow: "hidden", resize: "none" }}
          />

          <div className="flex justify-between items-center pt-5">
            <div className="bg-gray-600 px-2 md:px-3 py-1 rounded-3xl hover:bg-gray-700 cursor-pointer">
              <p className="pixelify text-sm md:text-base">Improve Prompt</p>
            </div>
          
            <button
                type="submit"
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-full ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-rose-500 transition-all duration-150"
                }`}
                disabled={isSubmitting}
              >
                <RiSendPlaneLine className="text-black text-lg md:text-2xl"/>
              </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
