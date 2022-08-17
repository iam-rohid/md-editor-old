import PrimarySidebar from "@/components/PrimarySidebar";
import SecondarySidebar from "@/components/SecondarySidebar";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "@tanstack/react-location";

const AppLayout = () => {
  const bgColor = useColorModeValue("white", "black");
  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100vw"
      overflow="hidden"
      bgColor={bgColor}
    >
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
