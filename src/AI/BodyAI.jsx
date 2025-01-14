import React, { useState, useEffect, useRef } from "react";
import { requestToGroq, classifyQuestion, saveQuestionData } from "./Groq";

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
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
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
                  ? "bg-gray-800 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-800 bg-opacity-50 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 text-gray-900 rounded-md"
        />
        <button
          onClick={sendMessage}
          disabled={isProcessing}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;