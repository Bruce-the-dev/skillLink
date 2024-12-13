import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";

const InboxPage = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get userId from cookies
  const [cookies] = useCookies(["id"]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const senderId = cookies.id; // Get user ID from cookie

        if (!senderId) {
          toast.error("User ID is not available");
          setLoading(false);
          return;
        }

        toast.info("Loading conversations...", { toastId: "loading-toast" });

        // Fetch data from your Spring Boot backend
        const response = await fetch(
          `http://localhost:8080/api/messages/sender/${senderId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const data = await response.json(); // Parse JSON response
        setConversations(data);
        setLoading(false);
        toast.dismiss("loading-toast"); // Dismiss loading toast once done
      } catch (err) {
        toast.error(err.message);
        setError(err); // Store the error for future reference
        setLoading(false);
      }
    };

    fetchConversations();
  }, [cookies.id]); // Dependency on cookies.id

  return (
    <div>
      <ToastContainer />
      <h2>Inbox</h2>
      {loading && <div>Loading...</div>} {/* Show loading indicator */}
      {error && <div style={{ color: "red" }}>Error: {error.message}</div>}{" "}
      {/* Show error */}
      {!loading && conversations.length === 0 && (
        <div>No conversations found.</div>
      )}
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <strong>{conversation.learnerName}:</strong>{" "}
            {conversation.lastMessage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InboxPage;
