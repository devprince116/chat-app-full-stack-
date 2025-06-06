import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BsChatText } from "react-icons/bs";
import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logoutUser } from "../store/reducers/authReducer";
import { toast } from "react-toastify";
export default function Authanticated() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigation = useNavigate();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useAppDispatch();

  const handleClose = (route?: "profile" | "logout") => {
    return () => {
      if (route) {
        if (route === "logout") {
          // Clear tokens from local storage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");

          // Dispatch Redux action to reset auth state
          dispatch(logoutUser());
          toast.success("Logged out!");

          // Redirect to login page
          navigation("/login", { replace: true });
        } else {
          navigation("/" + route);
        }
      }
      setAnchorEl(null);
    };
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigation("/login");
    }
  }, [isAuthenticated, navigation]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            disabled
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            gap={2}
            alignItems="center"
            component={Link}
            to="/"
            sx={{ textDecoration: "none" }}
          >
            <Typography color="white" variant="h6" sx={{ flexGrow: 1 }}>
              <BsChatText />
            </Typography>
          </Box>
          {isAuthenticated && (
            <Box marginLeft="auto">
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose()}
              >
                <MenuItem onClick={handleClose("profile")}>Profile</MenuItem>
                <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
