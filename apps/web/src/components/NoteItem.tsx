import { Text, Button, ButtonProps } from "@chakra-ui/react";

type NoteItemProps = ButtonProps & {
  title: string;
  subtitle: string;
  isActive?: boolean;
};

const NoteItem = (props: NoteItemProps) => {
  const { title, subtitle, ...rest } = props;
  return (
    <Button
      {...rest}
      w="full"
      variant="ghost"
      py="2"
      h="fit-content"
      px="2.5"
      overflow="hidden"
      display="block"
      textAlign="left"
    >
      <Text textOverflow="ellipsis" overflow="hidden" mb="0.5">
        {title}
      </Text>
      <Text
        fontWeight="normal"
        fontSize="sm"
        textOverflow="ellipsis"
        overflow="hidden"
        w="full"
      >
        {subtitle}
      </Text>
    </Button>
  );
};

export default NoteItem;
