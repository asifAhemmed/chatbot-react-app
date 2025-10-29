import { useEffect, useState } from "react";
import Chatbot from "../utils/chat-bot";

const InputText = ({ messages, setMessages, loading, setLoading }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    
    const userMessage = text;
    setText(""); 
    
    const newMessages = [
      ...messages,
      {
        id: crypto.randomUUID(),
        message: userMessage,
        sender: "user",
      },
    ];
    setMessages(newMessages);
  };

  useEffect(() => {
    const getResponse = async () => {
      if (messages.length === 0) return;
      
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender !== "user") return;

      try {
        setLoading(true);
        const robotMessageId = crypto.randomUUID();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: robotMessageId,
            message: "", 
            sender: "robot",
          },
        ]);
        
        const response = await Chatbot.getResponseAsync(lastMessage.message);
        
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === robotMessageId
              ? { ...msg, message: response }
              : msg
          )
        );
      } catch (error) {
        console.error(error);
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), 
          {
            id: crypto.randomUUID(),
            message: "Sorry, I encountered an error. Please try again.",
            sender: "robot",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getResponse();
  }, [messages, setMessages, setLoading]); 

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
    if (e.key === "Escape") {
      setText("");
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Send a message to Chatbot"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button
        disabled={loading || !text.trim()}
        className="send-button"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default InputText;