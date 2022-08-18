import { getCurrentUserAsync } from "@/api/authApi";
import { ACCESS_TOKEN_KEY } from "@/constants/keys";
import { User } from "@/models/user";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

type AuthContextType = {
  isLoading: boolean;
  user?: User;
  onLogOut: () => void;
  setToken: (accessToken: string) => void;
  error: unknown;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider = (props: Props) => {
  const { children } = props;
  const { data, error, isLoading, refetch } = useQuery(
    ["currentUser"],
    getCurrentUserAsync,
    {
      onSettled(data, error) {
        console.log({ data, error });
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const onLogOut = () => {};

  const setToken: AuthContextType["setToken"] = (accessToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    refetch();
  };

  const contextValue: AuthContextType = {
    isLoading,
    user: data,
    onLogOut,
    setToken,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth must use inside AuthProvider");
  }
  return context;
};
