import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

const PrivateGroups = ({
  privateGroups,
  loggedInUser,
  selectedGroup,
  setSelectedGroup,
}) => {
  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold" mt={2}>
        Private Groups
      </Typography>
      <List>
        {privateGroups.length === 0 ? (
          <Typography color="gray" textAlign="center">
            No private groups available
          </Typography>
        ) : (
          privateGroups.map((group) => {
            const isMember = group.members.some(
              (member) => member.id === loggedInUser?.id
            );
            return (
              <React.Fragment key={group.id}>
                {isMember && ( // Only show private groups the user is part of
                  <>
                    <ListItem
                      button
                      onClick={() => setSelectedGroup(group)}
                      sx={{
                        transition: "0.3s",
                        "&:hover": { bgcolor: "#E3F2FD", borderRadius: "8px" },
                        bgcolor:
                          selectedGroup?.id === group.id ? "#0078FF" : "white",
                        color:
                          selectedGroup?.id === group.id ? "white" : "black",
                      }}
                    >
                      <ListItemText
                        primary={group.name}
                        secondary={`${group.members.length} members`}
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    <Divider />
                  </>
                )}
              </React.Fragment>
            );
          })
        )}
      </List>
    </>
  );
};

export default PrivateGroups;
