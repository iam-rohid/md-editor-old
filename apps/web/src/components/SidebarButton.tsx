import { As, Button, ButtonProps, Icon, Text } from "@chakra-ui/react";

export type SidebarNavProps = ButtonProps & {
  label: string;
  icon: As<any>;
  isActive?: boolean;
};

const SidebarButton = ({ label, icon, ...props }: SidebarNavProps) => {
  return (
    <Button
      {...props}
      w="full"
      h="8"
      leftIcon={<Icon as={icon} fontSize="xl" />}
      variant="ghost"
      px="2.5"
      iconSpacing="1.5"
    >
      <Text flex={1} textAlign="left">
        {label}
      </Text>
    </Button>
  );
};

export default SidebarButton;
