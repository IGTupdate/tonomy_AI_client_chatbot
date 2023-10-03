//components/ChatbotWidget

import React, { useState } from "react";
import Image from "next/image";
import chatIcon from "../assets/imges/pngegg.png";
import Chatbot from "../components/panels/chatbotdemo";

const ChatbotWidget = (id: any) => {
  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", id);

  const [showSettings, setShowSettings] = useState(false);
  const [selectedElement, setSelectedElement] = useState("");

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setSelectedElement("chatdemo-container");
  };

  return (
    <>
      <div className="chatbot-widget-container">
        {showSettings && (
          <div className="small-chatbot-container text-right float-right">
            <Chatbot />
          </div>
        )}
        <div className="chatbot ">
          <button
            className="btn btn-primary position-absolute rounded-circle"
            style={{ bottom: "40px", zIndex: "99", right: "16px" }}
            onClick={toggleSettings}
          >
            <Image src={chatIcon} width="40" height="50" alt="widget-icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotWidget;
