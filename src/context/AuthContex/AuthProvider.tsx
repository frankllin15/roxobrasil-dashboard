import { useContext, useEffect, useState } from "react";
import AuthContext, { IAuthContext, ILogin } from "./Context";
import { useCookies } from "react-cookie";
import { ISession } from "../../types";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/lib/graphql/mutation";

export const AuthProvider: React.FC = ({ children }) => {
  const [session, setSession] = useState<ISession | null>(null);

  const [cookies, setCookies, removeCookies] = useCookies(["session", "cart"]);
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (cookies.session) {
      setSession(cookies.session);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(input: ILogin) {
    const {
      data: {
        login: { success, errors, user, access_token },
      },
    } = await loginMutation({ variables: { input } });

    if (success) {
      const now = Date.now();
      setSession({ token: access_token, user });
      setCookies(
        "session",
        { token: access_token, user },
        {
          path: "/",
          expires: new Date(now + 60 * 60 * 1000),
        }
      );
    }

    return {
      success,
      errors,
    };
  }

  function logout() {}

  return (
    <AuthContext.Provider value={{ session, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
