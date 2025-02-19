import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import {
  useSendGroupMessageMutation,
  useGetGroupMessagesQuery,
} from "../../services/api";
import ScrollableFeed from "react-scrollable-feed";

interface ChatBoxProps {
  selectedGroup: { id: string; name: string } | null;
  isAuthenticated: boolean;
  loggedInUser: { id: string } | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  selectedGroup,
  isAuthenticated,
  loggedInUser,
}) => {
  const [message, setMessage] = useState("");
  const [sendGroupMessage] = useSendGroupMessageMutation();

  const { data, isLoading, refetch } = useGetGroupMessagesQuery(
    { groupId: selectedGroup?.id || "" },
    { skip: !selectedGroup }
  );

  useEffect(() => {
    if (selectedGroup) {
      refetch();
      const interval = setInterval(() => {
        refetch();
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval);
    }
  }, [selectedGroup, refetch]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedGroup) return;

    try {
      await sendGroupMessage({
        groupId: selectedGroup.id,
        message,
      }).unwrap();
      setMessage("");
      refetch();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box flex={1} display="flex" flexDirection="column" p={2}>
      <Typography variant="h6" color="black" textAlign="center" mb={2}>
        {selectedGroup?.name || "Select a group to start chatting"}
      </Typography>

      {/* Messages List */}
      <Box flex={1} bgcolor="#F5F5F5" p={2} borderRadius={2} overflow="auto">
        <ScrollableFeed>
          {isLoading ? (
            <Typography>Loading messages...</Typography>
          ) : (
            data?.data?.messages?.map((msg) => (
              <Box
                key={msg.id}
                display="flex"
                justifyContent={
                  msg.senderId === loggedInUser?.id ? "flex-end" : "flex-start"
                }
                mb={1}
              >
                <Box
                  p={1.5}
                  borderRadius={2}
                  maxWidth="70%"
                  sx={{
                    backgroundColor:
                      msg.senderId === loggedInUser?.id ? "#0078FF" : "#E0E0E0",
                    color:
                      msg.senderId === loggedInUser?.id ? "white" : "black",
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", opacity: 0.7 }}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </ScrollableFeed>
      </Box>

      {/* Message Input */}
      {isAuthenticated && (
        <Box display="flex" mt={2}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{ ml: 2 }}
          >
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
