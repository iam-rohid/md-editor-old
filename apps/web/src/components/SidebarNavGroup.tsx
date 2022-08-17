import {
  As,
  Box,
  ButtonGroup,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export type SidebarNavGroupProps = FlexProps & {
  children: ReactNode;
  title?: string;
  actions?: {
    icon: As<any>;
    label: string;
    onClick?: () => void;
  }[];
};

const SidebarNavGroup = (props: SidebarNavGroupProps) => {
  const { children, title, actions, ...rest } = props;
  const titleColor = useColorModeValue("gray.600", "gray.300");
  return (
    <Flex {...rest} flexDir="column" my="4">
      {!!title && (
        <Flex h="8" alignItems="center">
          <Box flex={1} px="3">
            <Text
              textTransform="uppercase"
              fontWeight="medium"
              color={titleColor}
              fontSize="sm"
            >
              {title}
            </Text>
          </Box>
          {!!actions && actions.length > 0 && (
            <ButtonGroup size="sm">
              {actions?.map((action) => (
                <IconButton
                  aria-label={action.label}
                  icon={<Icon as={action.icon} fontSize="xl" />}
                  onClick={action.onClick}
                  variant="ghost"
                />
              ))}
            </ButtonGroup>
          )}
        </Flex>
      )}
      {children}
    </Flex>
  );
};

export default SidebarNavGroup;
