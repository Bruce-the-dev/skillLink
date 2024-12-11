import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InboxPage() {
  const onConversationSelect = useParams();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Fetch conversations data (mock data for now)
    const fetchConversations = async () => {
      const mockData = [
        {
          id: 1,
          name: "Instructor A",
          lastMessage: "Please review Chapter 2",
          timestamp: "2024-12-10 15:30",
        },
        {
          id: 2,
          name: "Instructor B",
          lastMessage: "How are you finding the course?",
          timestamp: "2024-12-09 18:20",
        },
      ];
      setConversations(mockData);
    };

    fetchConversations();
  }, []);

  return (
    <div style={styles.inboxContainer}>
      <h1 style={styles.header}>Inbox</h1>
      <ul style={styles.conversationList}>
        {conversations.map((conv) => (
          <li
            key={conv.id}
            style={styles.conversationItem}
            onClick={() => onConversationSelect(conv.id)}
          >
            <h3>{conv.name}</h3>
            <p>{conv.lastMessage}</p>
            <span style={styles.timestamp}>{conv.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  inboxContainer: { padding: "20px", fontFamily: "Arial, sans-serif" },
  header: { textAlign: "center" },
  conversationList: { listStyleType: "none", padding: 0 },
  conversationItem: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "10px",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
  },
  timestamp: { fontSize: "12px", color: "#888" },
};

export default InboxPage;
