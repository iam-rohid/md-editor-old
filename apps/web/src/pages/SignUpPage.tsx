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
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type LogInForm = {
  name: string;
  email: string;
  password: string;
  confimrPassword: string;
};

const SignUpPage = () => {
  const formData = useForm<LogInForm>();
  const [showPassword, setShowPassword] = useBoolean(false);

  const onSubmit = (value: LogInForm) => {
    console.log("onSubmit", value);
  };

  return (
    <Container maxW="md" my="16">
      <Heading mb="8" size="lg">
        Sign Up
      </Heading>

      <Box as="form" onSubmit={formData.handleSubmit(onSubmit)}>
        <FormControl mb="4" isInvalid={!!formData.formState.errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="John Doe"
            {...formData.register("name", {
              required: "Name is required",
            })}
          />
          {!!formData.formState.errors.name && (
            <FormErrorMessage>
              {formData.formState.errors.name.message}
            </FormErrorMessage>
          )}
        </FormControl>

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
                minLength: {
                  value: 6,
                  message: "Password must not be less than 6 characters long",
                },
                maxLength: {
                  value: 16,
                  message: "Password must not be more than 16 characters long",
                },
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

        <FormControl
          mb="4"
          isInvalid={!!formData.formState.errors.confimrPassword}
        >
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...formData.register("confimrPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === formData.getValues("password") ||
                  "Password didn't matched",
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
          {!!formData.formState.errors.confimrPassword && (
            <FormErrorMessage>
              {formData.formState.errors.confimrPassword.message}
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

export default SignUpPage;
