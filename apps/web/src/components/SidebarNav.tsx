import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type SidebarNavProps = FlexProps & {
  children: ReactNode;
};

const SidebarNav = (props: SidebarNavProps) => {
  return <Box {...props} px="2" />;
};

export default SidebarNav;
