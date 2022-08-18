import AuthHeader from "@/components/AuthHeader";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "@tanstack/react-location";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = (props: Props) => {
  const { children } = props;
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AuthHeader />
      {children}
    </>
  );
};

export default AuthLayout;
