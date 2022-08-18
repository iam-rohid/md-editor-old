import { getCurrentUserAsync } from "@/api/authApi";
import { ACCESS_TOKEN_KEY } from "@/constants/keys";
import { User } from "@/models/user";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useCallback, useContext } from "react";

type AuthContextType = {
  isLoading: boolean;
  user?: User;
  onLogOut: () => void;
  setToken: (accessToken: string) => void;
  status: "error" | "success" | "loading";
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider = (props: Props) => {
  const { children } = props;
  const { data, isLoading, refetch, status } = useQuery(
    ["currentUser"],
    getCurrentUserAsync,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const onLogOut = useCallback(() => {
    localStorage.clear();
    refetch();
  }, [refetch]);

  const setToken: AuthContextType["setToken"] = useCallback(
    (accessToken) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      refetch();
    },
    [refetch]
  );

  const contextValue: AuthContextType = {
    isLoading,
    user: data,
    onLogOut,
    setToken,
    status,
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
