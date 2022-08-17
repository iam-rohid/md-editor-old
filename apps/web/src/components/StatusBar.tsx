import { Flex, useColorModeValue } from "@chakra-ui/react";

const StatusBar = () => {
  const bgColor = useColorModeValue("primary.500", "primary.400");

  return (
    <Flex h="8" bgColor={bgColor}>
      Status bar
    </Flex>
  );
};

export default StatusBar;
