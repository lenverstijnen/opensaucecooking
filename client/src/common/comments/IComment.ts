import { IUser } from "../interfaces/IUser";

export interface IComment {
  _id: string;
  text: string;
  user?: IUser;
}
