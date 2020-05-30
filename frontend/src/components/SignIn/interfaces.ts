import { Dispatch, SetStateAction } from "react";
import { IUser } from "../User/interfaces";

export interface SignInProps {
  setUser: Dispatch<SetStateAction<IUser | null>>
}