import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useCreateGroupMutation } from "../../services/api";

const AddGroup = ({ open, onClose, onGroupCreated }) => {
  const [groupName, setGroupName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [createGroup] = useCreateGroupMutation();

  const handleCreateGroup = async () => {
    try {
      await createGroup({ name: groupName, isPublic }).unwrap();
      setGroupName("");
      setIsPublic(true);
      onGroupCreated(); // Refresh group list in Home.tsx
      onClose(); // Close dialog
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Group</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Group Name"
          variant="outlined"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          }
          label="Public Group"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateGroup}
          disabled={!groupName}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGroup;
