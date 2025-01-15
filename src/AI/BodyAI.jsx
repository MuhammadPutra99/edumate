import React, { useState, useEffect, useRef } from "react";
import { requestToGroq, classifyQuestion, saveQuestionData } from "./Groq";
import { RiSendPlaneLine } from "react-icons/ri";

const ChatBot = ({ userMessage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const initialMessageSent = useRef(false);

  // Handle initial message
  useEffect(() => {
    const sendInitialMessage = async () => {
      if (!userMessage || initialMessageSent.current) return;
      initialMessageSent.current = true;

      setMessages([{ sender: "user", text: userMessage }]);
      
      try {
        // Klasifikasi pertanyaan
        const category = await classifyQuestion(userMessage);
        
        // Simpan data pertanyaan
        saveQuestionData(userMessage, category);
        
        // Dapatkan respons berdasarkan kategori
        const reply = await requestToGroq(userMessage, category);
        
        setMessages(messages => [
          ...messages,
          { 
            sender: "bot", 
            text: reply.content,
            category: reply.category 
          }
        ]);
      } catch (error) {
        console.error("Error processing message:", error);
        setMessages(messages => [
          ...messages,
          { sender: "bot", text: "Error processing your request." }
        ]);
      }
    };

    sendInitialMessage();
  }, [userMessage]);

  const sendMessage = async () => {
    if (input.trim() === "" || isProcessing) return;
    setIsProcessing(true);

    const userText = input.trim();
    setInput("");

    setMessages(prev => [...prev, { sender: "user", text: userText }]);

    try {
      const category = await classifyQuestion(userText);
      saveQuestionData(userText, category);
      
      const reply = await requestToGroq(userText, category);
      setMessages(prev => [
        ...prev,
        { 
          sender: "bot", 
          text: reply.content,
          category: reply.category 
        }
      ]);
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Error processing your request." }
      ]);
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isProcessing && input.trim()) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="md:h-[90vh] flex flex-col py-10 px-7 md:px-10">
      <div className="flex-1 md:p-4 overflow-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-10 ${
              msg.sender === "bot" ? "text-left" : "text-right"
            }`}
          >
            {msg.category && (
              <span className="text-xs text-gray-400 mb-1 block">
                Kategori: {msg.category}
              </span>
            )}
            <p
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "bot"
                  ? "bg-gray-700 text-white text-sm md:text-lg"
                  : "bg-gray-800 text-white md:text-left text-sm md:text-lg"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-gray-800 md:px-5 py-2 md:py-3 h-auto rounded-2xl mt-10">
        <div className="px-2 md:px-4 bg-opacity-50 flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full px-4 py-2 bg-gray-800 text-sm md:text-xl text-white rounded-md outline-none h-auto"
            rows={1}
            style={{ overflow: "hidden", resize: "none" }} // Prevent manual resizing
          />
          <div className="flex">
            <button
              onClick={sendMessage}
              disabled={isProcessing}
              className={`flex justify-center items-center px-1 py-1 md:px-2 md:py-2 bg-white rounded-full ${
                isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-rose-600"
              }`}
            >
              <RiSendPlaneLine className="text-black text-2xl"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;