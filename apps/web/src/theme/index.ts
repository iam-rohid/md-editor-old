import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Button from "./components/button";
import Input from "./components/input";

const theme = extendTheme({
  colors,
  components: {
    Button,
    Input,
  },
});

export default theme;
