import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MessageThreadPage() {
  const conversationId = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages for the conversation (mock data for now)
    const fetchMessages = async () => {
      const mockMessages = [
        {
          id: 1,
          sender: "Instructor A",
          content: "Hi! How can I help you?",
          timestamp: "2024-12-10 15:30",
        },
        {
          id: 2,
          sender: "You",
          content: "Can you explain the assignment?",
          timestamp: "2024-12-10 16:00",
        },
      ];
      setMessages(mockMessages);
    };

    fetchMessages();
  }, [conversationId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: messages.length + 1,
          sender: "You",
          content: newMessage,
          timestamp: new Date().toLocaleString(),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div style={threadStyles.container}>
      <button
        style={threadStyles.backButton}
        onClick={navigate("/student/Inbox")}
      >
        Back to Inbox
      </button>
      <div style={threadStyles.messageContainer}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={
              msg.sender === "You"
                ? threadStyles.userMessage
                : threadStyles.instructorMessage
            }
          >
            <p>{msg.content}</p>
            <span style={threadStyles.timestamp}>{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div style={threadStyles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={threadStyles.input}
          placeholder="Type your message..."
        />
        <button style={threadStyles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const threadStyles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  backButton: { marginBottom: "10px", padding: "10px", cursor: "pointer" },
  messageContainer: {
    maxHeight: "400px",
    overflowY: "auto",
    marginBottom: "10px",
  },
  userMessage: {
    textAlign: "right",
    marginBottom: "10px",
    backgroundColor: "#e0f7fa",
    padding: "10px",
    borderRadius: "8px",
  },
  instructorMessage: {
    textAlign: "left",
    marginBottom: "10px",
    backgroundColor: "#e8f5e9",
    padding: "10px",
    borderRadius: "8px",
  },
  timestamp: {
    fontSize: "12px",
    color: "#888",
    display: "block",
    marginTop: "5px",
  },
  inputContainer: { display: "flex", gap: "10px" },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};

export default MessageThreadPage;
