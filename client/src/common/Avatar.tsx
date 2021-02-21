import React from "react";
import { Avatar as MuiAvatar, makeStyles } from "@material-ui/core";
import { getInitials } from "../utils/getInitials";
import { IUser } from "./interfaces/IUser";

const useStyles = makeStyles(() => ({
  root: {},
}));

interface Props {
  user?: IUser;
  className?: string;
}

export const Avatar: React.FC<Props> = ({ user, className }) => {
  const styles = useStyles();
  const initials = getInitials(user?.firstName, user?.lastName);

  return (
    <div className={className}>
      <MuiAvatar
        className={styles.root}
        src={user?.photoUrl}
        data-testid="avatar"
      >
        {initials}
      </MuiAvatar>
    </div>
  );
};
