import { useState } from "react";
import InputText from "./components/InputText";
import ChatMessagesList from "./components/ChatMessagesList";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="app-container">
      <InputText
        messages={messages}
        setMessages={setMessages}
        loading={loading}
        setLoading={setLoading}
      />
      {messages.length === 0 && (
        <p className="welcome-text">
          Welcome to the Chatbot project! Type something to start a
          conversation.
        </p>
      )}
      <ChatMessagesList messages={messages} loading={loading} />
    </div>
  );
};

export default App;
