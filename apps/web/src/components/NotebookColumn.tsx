import {
  Box,
  Flex,
  Text,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import { MdAdd } from "react-icons/md";
import NoteItem from "./NoteItem";
import SidebarItemGroup from "./SidebarItemGroup";

const NotebookColumn = () => {
  return (
    <Flex h="full" flexDir="column" overflow="hidden">
      <Header />
      <Box flex={1} overflowY="auto">
        <SidebarItemGroup>
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
            isActive
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
        </SidebarItemGroup>
      </Box>
    </Flex>
  );
};

export default NotebookColumn;

const Header = () => {
  const borderColor = useColorModeValue("gray.100", "gray.900");
  return (
    <Flex
      h="12"
      w="full"
      alignItems="center"
      px="2"
      borderColor={borderColor}
      borderBottomWidth={1}
      zIndex={2}
    >
      <Box flex={1} px="3">
        <Text noOfLines={1} fontWeight="semibold">
          All Notes
        </Text>
      </Box>
      <IconButton
        aria-label="New Note"
        icon={<Icon as={MdAdd} fontSize="2xl" />}
        variant="ghost"
        size="sm"
      />
    </Flex>
  );
};
