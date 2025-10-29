import robot from "../assets/robot.png";
import user from "../assets/user.png";
import Loading from "./Loading";

const ChatMessagesCard = ({ message, loading, isLastMessage }) => {
  const { message: messageText, sender } = message;

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={robot} alt="robot-image" className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {loading && sender === "robot" && isLastMessage && !messageText ? (
          <Loading />
        ) : (
          messageText
        )}
      </div>
      {sender === "user" && (
        <img src={user} alt="user-image" className="chat-message-profile" />
      )}
    </div>
  );
};

export default ChatMessagesCard;