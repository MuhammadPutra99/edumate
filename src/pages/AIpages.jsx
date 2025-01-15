import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ChatBot from "../AI/BodyAI";
import InputForm from "../AI/InputForm";
import FooterAI from "../AI/FooterAI";
import FooterextraAI from "../AI/FooterextraAI";

export default function AIpages() {
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState(null);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="min-h-screen">
        <Navbar />
        {showChat ? (
          <ChatBot userMessage={userMessage} />
        ) : (
          <InputForm setShowChat={setShowChat} setUserMessage={setUserMessage} />
        )}
      </div>

      <div>
          <FooterAI/>
          <div className="w-full h-[2px] bg-gray-800"></div>
          <FooterextraAI/>
        </div>
    </div>
  );
}