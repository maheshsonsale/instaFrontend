import { useState } from "react";
import { Send, Smile, Camera } from "lucide-react";
import "./ChatPage.css";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sender: "them" },
    { id: 2, text: "Hello! What's up?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 className="chat-username">@username</h1>
        <Camera className="chat-icon" />
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.sender === "me" ? "chat-bubble-me" : "chat-bubble-them"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <Smile className="chat-icon" />
        <input
          type="text"
          className="chat-input"
          placeholder="Message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>
          <Send className="chat-icon" />
        </button>
      </div>
    </div>
  );
}
