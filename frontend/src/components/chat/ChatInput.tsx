import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage(""); // Clear input field after sending
  };

  return (
    <form
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
      onSubmit={handleSend}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
      />
      <IconButton type="submit" color="primary">
        <SendIcon />
      </IconButton>
    </form>
  );
};

export default ChatInput;
