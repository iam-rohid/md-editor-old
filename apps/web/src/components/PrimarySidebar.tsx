import SITE from "@/constants/SITE";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  MdAdd,
  MdDarkMode,
  MdFolder,
  MdLightMode,
  MdList,
  MdSearch,
  MdSettings,
  MdStar,
  MdTag,
} from "react-icons/md";
import SidebarButton from "./SidebarButton";
import SidebarNav from "./SidebarNav";
import SidebarNavGroup from "./SidebarNavGroup";

const PrimarySidebar = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  return (
    <Flex flexDir="column" style={{ width: 220 }} bgColor={bgColor}>
      <Header />
      <Box flex={1} overflowY="auto">
        <SidebarNav>
          <SidebarNavGroup>
            <SidebarButton icon={MdSearch} label="Search" />
            <SidebarButton icon={MdList} label="All Notes" isActive />
            <SidebarButton icon={MdStar} label="Favorites" />
            <SidebarButton icon={MdSettings} label="Settings" />
          </SidebarNavGroup>
          <SidebarNavGroup
            title="Notebooks"
            actions={[
              {
                label: "Add Notebook",
                icon: MdAdd,
              },
            ]}
          >
            <SidebarButton icon={MdFolder} label="Daily logs" />
            <SidebarButton icon={MdFolder} label="My Articles" />
            <SidebarButton icon={MdFolder} label="Projects" />
          </SidebarNavGroup>
          <SidebarNavGroup
            title="Tags"
            actions={[
              {
                label: "Add Notebook",
                icon: MdAdd,
              },
            ]}
          >
            <SidebarButton icon={MdTag} label="Article" />
            <SidebarButton icon={MdTag} label="Reminder" />
            <SidebarButton icon={MdTag} label="Place" />
            <SidebarButton icon={MdTag} label="Gym" />
          </SidebarNavGroup>
        </SidebarNav>
      </Box>
    </Flex>
  );
};

export default PrimarySidebar;

const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Flex
      position="sticky"
      top={0}
      w="full"
      h="12"
      alignItems="center"
      px="2"
      zIndex={2}
      gap="1"
    >
      <Box flex={1} px="3">
        <Heading size="md" textTransform="uppercase">
          {SITE.NAME}
        </Heading>
      </Box>
      <IconButton
        aria-label="Account"
        variant="ghost"
        size="sm"
        icon={
          <Icon
            as={colorMode === "light" ? MdLightMode : MdDarkMode}
            fontSize="xl"
          />
        }
        onClick={toggleColorMode}
      />
      <IconButton
        aria-label="Account"
        variant="ghost"
        size="sm"
        icon={<Avatar size="xs" />}
      />
    </Flex>
  );
};
