import { StyleFunctionProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bgColor: mode("white", "black")(props),
      transition: "none",
    },
  }),
};

export default styles;
