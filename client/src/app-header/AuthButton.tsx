import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuItemProps,
} from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <Button color="inherit" onClick={loginWithPopup}>
      Login
    </Button>
  );
};

export const AuthButton = () => {
  const { isAuthenticated, user, logout, loginWithPopup } = useAuth0();
  const { push } = useHistory();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // TODO: create HOC for a self closing menu item
  //   const ClosingMenuItem = () => (<MenuItem onClick={handleClose} {...props}></MenuItem>);

  return isAuthenticated ? (
    <div>
      <Avatar
        alt={user?.name}
        src={user?.picture}
        onClick={handleClick}
        id="test"
      ></Avatar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </div>
  ) : (
    <LoginButton />
  );
};
