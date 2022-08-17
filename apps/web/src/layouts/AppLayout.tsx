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
    <Flex flexDir="column" h="100vh" w="100vw" overflow="hidden">
      <Flex w="full" h="full" flex={1}>
        <PrimarySidebar />
        <SecondarySidebar />
        <Box flex={1} w="full" h="full">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default AppLayout;
