import { Payload } from "@/lib/graphql";
import { createContext } from "react";
import { ISession } from "../../types";

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthContext {
  session: ISession | null;
  login: (input: ILogin) => Promise<Payload>;
}

const defaultState = {
  session: null,
  login: () => {
    success: true;
  },
};

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
