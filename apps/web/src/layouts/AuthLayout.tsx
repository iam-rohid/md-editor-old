import AuthHeader from "@/components/AuthHeader";
import FullscreenLoader from "@/components/FullscreenLoader";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "@tanstack/react-location";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = (props: Props) => {
  const { children } = props;
  const { status } = useAuth();

  if (status === "loading") {
    return <FullscreenLoader />;
  }

  if (status === "success") {
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
