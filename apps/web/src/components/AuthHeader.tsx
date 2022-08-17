import SITE from "@/constants/SITE";
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-location";

const AuthHeader = () => {
  const bgColor = useColorModeValue("white", "black");
  const borderColor = useColorModeValue("gray.100", "gray.900");
  return (
    <Flex
      alignItems="center"
      height="14"
      width="full"
      position="sticky"
      top={0}
      right={0}
      left={0}
      zIndex={10}
      px="4"
      bgColor={bgColor}
      borderColor={borderColor}
      borderBottomWidth={1}
    >
      <Box flex={1}>
        <Link to="/">
          <Heading size="md" as="a">
            {SITE.NAME}
          </Heading>
        </Link>
      </Box>
      <Flex gap="2">
        <Button as={Link} to="login" variant="ghost">
          Log In
        </Button>
        <Button as={Link} to="/signup" variant="outline">
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default AuthHeader;
