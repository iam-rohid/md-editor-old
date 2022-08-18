import PrimarySidebar from "@/components/PrimarySidebar";
import SecondarySidebar from "@/components/SecondarySidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Flex } from "@chakra-ui/react";
import { Navigate, Outlet } from "@tanstack/react-location";

const AppLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <div className="flex h-full w-full flex-1 flex-row">
        <PrimarySidebar />
        <SecondarySidebar />
        <div className="relative h-full w-full flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
