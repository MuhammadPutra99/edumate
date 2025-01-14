import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ChatBot from "../AI/BodyAI";
import InputForm from "../AI/InputForm";

export default function AIpages() {
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      <Navbar />
      {showChat ? (
        <ChatBot userMessage={userMessage} />
      ) : (
        <InputForm setShowChat={setShowChat} setUserMessage={setUserMessage} />
      )}
    </div>
  );
}