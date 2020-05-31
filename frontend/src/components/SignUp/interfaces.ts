import { Dispatch, SetStateAction } from "react";
import { IUser, IResponseError } from "../User/interfaces";


export interface ISignUnProps{
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setError: Dispatch<SetStateAction<IResponseError | null>>;
  setSignInPage: Dispatch<SetStateAction<boolean>>;
}