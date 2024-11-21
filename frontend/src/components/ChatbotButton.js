import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Move the getOptions function to the top
const getOptions = (accountType) => {
  if (accountType === "Merchant") {
    return [{ label: "Upload Product Help", action: "upload" }];
  } else {
    return [
      { label: "Help with Purchase", action: "buy" },
      { label: "Login Issue", action: "login" },
    ];
  }
};

const ChatbotButton = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I assist you today?",
      options: getOptions(user.accountType),
    },
  ]);

  const toggleChatbot = () => {
    if (isOpen) {
      // Reset chat when closing
      setMessages([
        {
          text: "Hello! How can I assist you today?",
          options: getOptions(user.accountType),
        },
      ]);
    }
    setIsOpen(!isOpen);
  };

  // Handle user selection from buttons
  const handleOptionSelect = (action) => {
    setMessages((prev) => [
      ...prev,
      { text: `You selected: ${action}`, options: [] },
    ]);

    let response = "I'm here to assist you!";
    if (user.accountType === "Merchant") {
      if (action === "upload") {
        response =
          "To upload a product, go to the dashboard and fill out the form.";
      }
    } else if (user.accountType === "Consumer") {
      if (action === "buy") {
        response = "To buy a product, click the 'Buy' button on the product.";
      } else if (action === "login") {
        response =
          "If you're having login issues, try turning off your Cap's lock.";
      }
    }

    // Show the response and offer a reset button
    setMessages((prev) => [
      ...prev,
      { text: response, options: getOptions(user.accountType) },
    ]);
  };

  return (
    <>
      <button onClick={toggleChatbot} className="chatbot-toggle">
        <i class="fa-solid fa-comment"></i>
      </button>
      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <h4>AI Chatbot</h4>
            <button onClick={toggleChatbot}><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div key={index}>
                <p>{msg.text}</p>
                {msg.options && msg.options.length > 0 && (
                  <div className="chatbot-options">
                    {msg.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option.action)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
