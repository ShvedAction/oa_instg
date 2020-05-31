import { Dispatch, SetStateAction } from "react";
import { IUser, IResponseError } from "../User/interfaces";

export interface ISignInProps {
  setUser: Dispatch<SetStateAction<IUser | null>>
  setError: Dispatch<SetStateAction<IResponseError | null>>
}