import React, { Props } from "react";
import {
  Avatar as MuiAvatar,
  makeStyles,
  StyledComponentProps,
} from "@material-ui/core";
import { getInitials } from "../utils/getInitials";
import { IUser } from "./interfaces/IUser";

const useStyles = makeStyles(() => ({
  root: {},
}));

interface AvatarProps {
  user?: IUser;
}

export const Avatar = ({ user }: AvatarProps) => {
  const styles = useStyles();
  const initials = getInitials(user?.firstName, user?.lastName);

  return (
    <MuiAvatar
      className={styles.root}
      src={user?.photoUrl}
      data-testid="avatar"
    >
      {initials}
    </MuiAvatar>
  );
};
