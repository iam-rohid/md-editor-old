import AuthHeader from "@/components/AuthHeader";
import { useAppSelector } from "@mdotion/store";
import { Navigate } from "@tanstack/react-location";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = (props: Props) => {
  const { children } = props;
  const user = useAppSelector((state) => state.user.data);

  if (!!user) {
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
