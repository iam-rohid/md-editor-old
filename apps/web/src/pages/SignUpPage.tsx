import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import classNames from "classnames";
import { useState } from "react";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  confimrPassword: string;
};

const SignUpPage = () => {
  const formData = useForm<SignUpForm>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (value: SignUpForm) => {
    console.log("onSubmit", value);
  };

  return (
    <div className="mx-auto my-16 max-w-md px-4">
      <h1 className="mb-16 text-center text-3xl font-bold">Sign Up</h1>

      <form onSubmit={formData.handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...formData.register("name", {
              required: "Name is required",
            })}
            className={classNames(
              "w-full rounded-md border bg-transparent px-4 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-500",
              {
                "border-red-500 dark:border-red-500":
                  !!formData.formState.errors.name,
                "border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700":
                  !formData.formState.errors.name,
              }
            )}
          />
          {!!formData.formState.errors.name && (
            <p className="text-sm text-red-500">
              {formData.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...formData.register("email", {
              required: "Email is required",
            })}
            className={classNames(
              "w-full rounded-md border bg-transparent px-4 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-500",
              {
                "border-red-500 dark:border-red-500":
                  !!formData.formState.errors.email,
                "border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700":
                  !formData.formState.errors.email,
              }
            )}
          />
          {!!formData.formState.errors.email && (
            <p className="text-sm text-red-500">
              {formData.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
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
              className={classNames(
                "w-full rounded-md border bg-transparent px-4 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-500",
                {
                  "border-red-500 dark:border-red-500":
                    !!formData.formState.errors.password,
                  "border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700":
                    !formData.formState.errors.password,
                }
              )}
            />
            <div className="absolute right-0 top-0 flex aspect-square h-full items-center justify-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-xl" />
                ) : (
                  <MdVisibility className="text-xl" />
                )}
              </button>
            </div>
          </div>
          {!!formData.formState.errors.password && (
            <p className="text-sm text-red-500">
              {formData.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...formData.register("confimrPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === formData.getValues("password") ||
                  "Password didn't matched",
              })}
              className={classNames(
                "w-full rounded-md border bg-transparent px-4 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-500",
                {
                  "border-red-500 dark:border-red-500":
                    !!formData.formState.errors.confimrPassword,
                  "border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700":
                    !formData.formState.errors.confimrPassword,
                }
              )}
            />
            <div className="absolute right-0 top-0 flex aspect-square h-full items-center justify-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-xl" />
                ) : (
                  <MdVisibility className="text-xl" />
                )}
              </button>
            </div>
          </div>
          {!!formData.formState.errors.confimrPassword && (
            <p className="text-sm text-red-500">
              {formData.formState.errors.confimrPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-primary-500 py-2 px-4 font-medium text-white outline-offset-2 hover:bg-primary-600 active:bg-primary-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
