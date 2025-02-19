import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
} from "@mui/material";

const PublicGroups = ({
  publicGroups,
  loggedInUser,
  handleJoinGroup,
  selectedGroup,
  setSelectedGroup,
}) => {
  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold" mt={2}>
        Public Groups
      </Typography>
      <List>
        {publicGroups.length === 0 ? (
          <Typography color="gray" textAlign="center">
            No public groups available
          </Typography>
        ) : (
          publicGroups.map((group) => {
            const isMember = group.members.some(
              (member) => member.id === loggedInUser?.id
            );

            return (
              <React.Fragment key={group.id}>
                <ListItem
                  button
                  onClick={() => setSelectedGroup(group)}
                  sx={{
                    transition: "0.3s",
                    "&:hover": { bgcolor: "#E3F2FD", borderRadius: "8px" },
                    bgcolor:
                      selectedGroup?.id === group.id ? "#0078FF" : "white",
                    color: selectedGroup?.id === group.id ? "white" : "black",
                  }}
                >
                  <ListItemText
                    primary={group.name}
                    secondary={`${group.members.length} members`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                  {!isMember && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinGroup(group.id);
                      }}
                    >
                      Join
                    </Button>
                  )}
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        )}
      </List>
    </>
  );
};

export default PublicGroups;
