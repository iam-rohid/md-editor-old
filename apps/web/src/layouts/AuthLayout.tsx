import AuthHeader from "@/components/AuthHeader";
import { Outlet } from "@tanstack/react-location";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
    </>
  );
};

export default AuthLayout;
