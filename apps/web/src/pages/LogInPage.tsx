import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
type LogInForm = {
  email: string;
  password: string;
};

const LogInPage = () => {
  const formData = useForm<LogInForm>();
  const [showPassword, setShowPassword] = useBoolean(false);
  const onSubmit = (value: LogInForm) => {
    console.log("onSubmit", value);
  };

  return (
    <Container maxW="md" my="16">
      <Heading mb="8" size="lg">
        Log In
      </Heading>

      <Box as="form" onSubmit={formData.handleSubmit(onSubmit)}>
        <FormControl mb="4" isInvalid={!!formData.formState.errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="john@example.com"
            {...formData.register("email", {
              required: "Email is required",
            })}
          />
          {!!formData.formState.errors.email && (
            <FormErrorMessage>
              {formData.formState.errors.email.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl mb="4" isInvalid={!!formData.formState.errors.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...formData.register("password", {
                required: "Password is required",
              })}
            />
            <InputRightElement>
              <IconButton
                size="sm"
                aria-label="Toggle Show Password"
                variant="ghost"
                icon={
                  <Icon
                    as={showPassword ? MdVisibilityOff : MdVisibility}
                    fontSize="xl"
                  />
                }
                onClick={setShowPassword.toggle}
              />
            </InputRightElement>
          </InputGroup>

          {!!formData.formState.errors.password && (
            <FormErrorMessage>
              {formData.formState.errors.password.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <Button type="submit" colorScheme="primary" w="full" mt="4">
          Continue with Email
        </Button>
      </Box>
    </Container>
  );
};

export default LogInPage;
