import { Box, Typography, CircularProgress, Button } from "@mui/material";
import {
  useGetAllGroupsQuery,
  useJoinPublicGroupMutation,
} from "../services/api";
import { useAppSelector } from "../store/store";
import ChatBox from "../components/chat/ChatBox";
import AddGroup from "../components/chat/AddGroup";
import PublicGroups from "../components/chat/PublicGroups";
import PrivateGroups from "../components/chat/PrivateGroups";

const Home = () => {
  const { data, isLoading, error, refetch } = useGetAllGroupsQuery();
  interface Group {
    id: string;
    name: string;
    isPublic: boolean;
    members: {
      id: string;
      email: string;
      role: "user" | "admin";
    }[];
  }

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [joinPublicGroup] = useJoinPublicGroupMutation();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const loggedInUser = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  // Separate public and private groups
  const publicGroups =
    data?.data?.groups?.filter((group) => group.isPublic) || [];
  const privateGroups =
    data?.data?.groups?.filter((group) => !group.isPublic) || [];

  const handleJoinGroup = async (groupId: string) => {
    try {
      const response = await joinPublicGroup({ groupId }).unwrap();
      const updatedGroup = response.data;

      if (!updatedGroup || !loggedInUser) return;

      // Update the selected group if it's the one the user joined
      setSelectedGroup((prev) =>
        prev?.id === groupId
          ? { ...prev, members: [...prev.members, loggedInUser] }
          : prev
      );

      // Manually update the groups in the UI
      const updatedGroups = data?.data?.groups.map((group) =>
        group.id === groupId
          ? { ...group, members: [...group.members, loggedInUser] }
          : group
      );

      // This forces a re-render with the updated group members
      refetch();

      return updatedGroup;
    } catch (err) {
      console.error("Error joining group:", err);
    }
  };

  const isMember = selectedGroup?.members.some(
    (member) => member.id === loggedInUser?.id
  );

  return (
    <Box display="flex" height="calc(100vh - 64px)" bgcolor="#F9FAFB">
      {/* Sidebar */}
      <Box
        width="25%"
        bgcolor="black"
        p={2}
        borderRight="2px solid #E0E0E0"
        boxShadow="2px 0 5px rgba(0, 0, 0, 0.1)"
        sx={{
          overflowY: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            background: "#0078FF",
            borderRadius: "10px",
          },
        }}
      >
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            Error fetching groups
          </Typography>
        ) : (
          <>
            {/* Public Groups */}
            <PublicGroups
              publicGroups={publicGroups}
              loggedInUser={loggedInUser}
              handleJoinGroup={handleJoinGroup}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />

            {/* Private Groups */}
            <PrivateGroups
              privateGroups={privateGroups}
              loggedInUser={loggedInUser}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          </>
        )}

        {/* Create Group Button */}
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenCreateDialog(true)}
          >
            Create Group
          </Button>
        </Box>
      </Box>

      {/* Chat Area */}
      {selectedGroup ? (
        isMember ? (
          <ChatBox
            selectedGroup={selectedGroup}
            isAuthenticated={isAuthenticated}
            loggedInUser={loggedInUser}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex={1}
            flexDirection="column"
          >
            <Typography variant="h6" color="textSecondary">
              You are not a member of this group.
            </Typography>
            {selectedGroup.isPublic && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleJoinGroup(selectedGroup.id)}
                sx={{ mt: 2 }}
              >
                Join Group
              </Button>
            )}
          </Box>
        )
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <Typography variant="h6" color="textSecondary">
            Select a group to start chatting.
          </Typography>
        </Box>
      )}

      {/* Create Group Dialog */}
      <AddGroup
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onGroupCreated={refetch}
      />
    </Box>
  );
};

export default Home;
