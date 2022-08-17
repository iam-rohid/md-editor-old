import { Box, useColorModeValue } from "@chakra-ui/react";
import NotebookColumn from "./NotebookColumn";

const SecondarySidebar = () => {
  const bgColor = useColorModeValue("white", "black");
  const borderColor = useColorModeValue("gray.100", "gray.900");
  return (
    <Box
      style={{ width: 260 }}
      borderRightWidth={1}
      borderColor={borderColor}
      bgColor={bgColor}
    >
      <NotebookColumn />
    </Box>
  );
};

export default SecondarySidebar;
