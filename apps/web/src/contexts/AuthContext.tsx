import { User } from "@/models/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  onLogOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider = (props: Props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const onLogOut = () => {};

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const contextValue: AuthContextType = {
    isLoading,
    user,
    onLogOut,
    setUser,
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
